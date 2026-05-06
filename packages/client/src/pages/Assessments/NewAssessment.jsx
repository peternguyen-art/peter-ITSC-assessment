import React from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { AssessmentService } from "../../services/AssessmentService";
import { useForm } from "react-hook-form";

const assessmentQuestions = [
  {
    label: "Previous contact with the Cat Judicial System",
    name: "prevContact",
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    label: "Physical altercations with other cats",
    name: "catAltercations",
    options: [
      { label: "0-3 altercations", value: "0" },
      { label: "3+ altercations", value: "1" },
    ],
  },
  {
    label: "Physical altercations with owner",
    name: "ownerAltercations",
    options: [
      { label: "0-10 altercations", value: "0" },
      { label: "10+ altercations", value: "1" },
    ],
  },
  {
    label: "Plays well with dogs",
    name: "dogsBehavior",
    options: [
      { label: "No", value: "1" },
      { label: "Yes", value: "0" },
    ],
  },
  {
    label: "Hisses at strangers",
    name: "strangerHisses",
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
];

export const NewAssessment = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      catDateOfBirth: "",
      catName: "",
      dogsBehavior: "0",
      ownerAltercations: "0",
      prevContact: "0",
      strangerHisses: "0",
      catAltercations: "0",
    },
  });
  const [submitError, setSubmitError] = React.useState("");
  const [submitSuccess, setSubmitSuccess] = React.useState("");

  const calculateScore = (data) => {
    return assessmentQuestions.reduce((score, question) => {
      return score + Number(data[question.name] ?? 0);
    }, 0);
  };

  const getRiskLevel = (score) => {
    if (score <= 1) {
      return "low";
    }

    if (score <= 3) {
      return "medium";
    }

    return "high";
  };

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const score = calculateScore(data);

      await AssessmentService.submit({
        catDateOfBirth: data.catDateOfBirth,
        catName: data.catName.trim(),
        instrumentType: "Cat Behavioral Instrument",
        riskLevel: getRiskLevel(score),
        score,
      });

      reset();
      setSubmitSuccess("Assessment submitted successfully.");
    } catch (error) {
      console.log(error);
      setSubmitError(error?.response?.data?.message ?? error.message ?? "Unable to submit assessment.");
    }
  };

  return (
    <div className="assessment-page py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xl={9} lg={10}>
            <Card className="assessment-card border-0 shadow-lg overflow-hidden">
              <div className="assessment-card__accent" />
              <Card.Body className="p-4 p-md-5">
                <div className="d-flex flex-column gap-3 mb-4">
                  <Badge bg="dark" className="align-self-start rounded-pill px-3 py-2 text-uppercase tracking-wide">
                    Cat Behavioral Instrument
                  </Badge>
                  <div>
                    <h1 className="display-6 fw-bold mb-2">Create a new assessment</h1>
                    <p className="text-body-secondary mb-0">
                      Capture the cat&apos;s details, calculate the score, and submit the assessment in one clean step.
                    </p>
                  </div>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  {submitError ? (
                    <Alert className="mb-4" variant="danger">
                      {submitError}
                    </Alert>
                  ) : null}

                  {submitSuccess ? (
                    <Alert className="mb-4" variant="success">
                      {submitSuccess}
                    </Alert>
                  ) : null}

                  <Row className="g-3 mb-4">
                    <Col md={6}>
                      <Form.Group controlId="catName">
                        <Form.Label>Cat&apos;s Name</Form.Label>
                        <Form.Control
                          placeholder="Mr. Fluffykins"
                          type="text"
                          {...register("catName")}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="catDateOfBirth">
                        <Form.Label>Cat&apos;s Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          {...register("catDateOfBirth")}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex flex-column gap-3">
                    {assessmentQuestions.map((question, index) => (
                      <section className="assessment-question" key={question.name}>
                        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                          <div>
                            <div className="text-uppercase text-body-secondary small fw-semibold mb-1">
                              Question {index + 1}
                            </div>
                            <h2 className="h5 mb-0">{question.label}</h2>
                          </div>
                          <Badge bg="light" text="dark" className="border rounded-pill px-3 py-2">
                            Required
                          </Badge>
                        </div>

                        <div className="d-flex flex-wrap gap-3">
                          {question.options.map((option) => (
                            <Form.Check
                              key={`${question.name}-${option.value}`}
                              inline
                              id={`${question.name}-${option.value}`}
                              label={option.label}
                              type="radio"
                              value={option.value}
                              {...register(question.name)}
                              className="assessment-option"
                            />
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>

                  <div className="d-grid d-md-flex justify-content-md-end mt-4">
                    <Button className="px-4 py-2" disabled={isSubmitting} size="lg" type="submit" variant="dark">
                      {isSubmitting ? "Submitting..." : "Submit assessment"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
