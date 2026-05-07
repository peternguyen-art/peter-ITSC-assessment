import { useEffect, useState } from 'react';
import { Badge, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { set } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isDeletingId, setIsDeletingId ] = useState([]);
  const [ error, setError ] = useState(``);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setIsLoading(true);
        const data = await AssessmentService.getList();
        setAssessments(data || []);
        setError(``);
      } catch (err) {
        setError(
          err?.response?.data?.message ??
            err.message ??
            `Failed to load assessments`,
        );
        setAssessments([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssessments();
  }, []);

  const getRiskLevelBadge = (riskLevel) => {
    const variantMap = {
      high: `danger`,
      low: `success`,
      medium: `warning`,
    };

    return <Badge bg={variantMap[riskLevel?.toLowerCase()] || `secondary`}>{riskLevel}</Badge>;
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return `-`;
    }
    return new Date(dateString).toLocaleDateString(`en-US`, {
      day: `numeric`,
      month: `short`,
      year: `numeric`,
    });
  };

  const handleDelete = async (assessmentId) => {
    if (assessmentId == null) {
      return;
    }

    if (!window.confirm(`Are you sure you want to delete this assessment? This action cannot be undone.`)) {
      return;
    }

    try {
      setIsDeletingId([ ...isDeletingId, assessmentId ]);
      await AssessmentService.delete(assessmentId);
      setAssessments(assessments.filter((assessment) => assessment.id !== assessmentId));
      setError(``);
    } catch (err) {
      setError(
        err?.response?.data?.message ??
          err.message ??
          `Failed to delete assessment`,
      );
    } finally {
      setIsDeletingId(isDeletingId.filter((id) => id !== assessmentId));
    }
  };

  const columns = [
    {
      accessorKey: `catName`,
      header: `Cat Name`,
    },
    {
      accessorKey: `catDateOfBirth`,
      cell: (info) => formatDate(info.getValue()),
      header: `Date of Birth`,
    },
    {
      accessorKey: `instrumentType`,
      header: `Instrument Type`,
    },
    {
      accessorKey: `score`,
      header: `Score`,
    },
    {
      accessorKey: `riskLevel`,
      cell: (info) => getRiskLevelBadge(info.getValue()),
      header: `Risk Level`,
    },
    {
      accessorKey: `createdAt`,
      cell: (info) => formatDate(info.getValue()),
      header: `Created`,
    },
    {
      id: `actions`,
      cell: (info) => {
        const assessmentId = info.row.original.id;
        return <button
          className="btn btn-sm btn-danger"
          onClick={() => handleDelete(assessmentId)}
          disabled={isDeletingId.includes(assessmentId)}
        >
          {isDeletingId.includes(assessmentId) ? `Deleting...` : `Delete`}
        </button>;
      },
      header: `Actions`,
    },
  ];

  const table = useReactTable({
    columns,
    data: assessments,
    getCoreRowModel: getCoreRowModel(),
  });

  let tableContent = null;

  if (error) {
    tableContent = <div className="alert alert-danger" role="alert">{error}</div>;
  } else if (isLoading) {
    tableContent = <div className="text-center py-5">
      <p className="text-body-secondary mb-0">Loading assessments...</p>
    </div>;
  } else if (assessments.length === 0) {
    tableContent = <div className="alert alert-info" role="alert">No assessments found. Create one to get started.</div>;
  } else {
    tableContent = <div className="table-responsive">
      <Table hover striped className="mb-0">
        <thead>
          <tr>
            {table.getHeaderGroups()[0]?.headers.map((header) => <th key={header.id} className="py-3 fw-semibold text-uppercase small">
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>)}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => <tr key={row.id}>
            {row.getVisibleCells().map((cell) => <td key={cell.id} className="py-3 align-middle">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>)}
          </tr>)}
        </tbody>
      </Table>
    </div>;
  }

  return <div className="assessment-page py-5">
    <Container>
      <Row className="justify-content-center">
        <Col lg={12}>
          <Card className="border-0 shadow-lg overflow-hidden">
            <Card.Body className="p-4 p-md-5">
              <div className="d-flex flex-column gap-3 mb-4">
                <div>
                  <h1 className="display-6 fw-bold mb-2">Assessment List</h1>
                  <p className="text-body-secondary mb-0">
                    Review all submitted cat behavioral assessments.
                  </p>
                </div>
              </div>

              {tableContent}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>;
};
