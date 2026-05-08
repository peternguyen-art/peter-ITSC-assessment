/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDom from 'react-router-dom';
import { clearCurrentUser, getCurrentUser } from '../../utils/auth';

export const DashboardBulletin = () => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const nav = ReactRouterDom.useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    if (!user) {
      nav(`/login`, { replace: true });
    }
  }, [ nav ]);

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
    nav(`/login`);
  };

  return <ReactBootstrap.Container className="py-4 py-md-5">
    <ReactBootstrap.Row className="justify-content-center">
      <ReactBootstrap.Col lg={10} xl={9}>
        <ReactBootstrap.Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-dark text-white p-4 p-md-5">
            <ReactBootstrap.Badge bg="light" text="dark" className="mb-3">Dashboard</ReactBootstrap.Badge>
            <h1 className="display-6 mb-3">Welcome, {currentUser?.firstName || currentUser?.username}!</h1>
            <p className="lead text-white-50 mb-0">
              Manage assessments, review results, and keep everything in one place.
            </p>
          </div>
          <ReactBootstrap.Card.Body className="p-4 p-md-5 bg-white">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <p className="text-uppercase text-muted small mb-1">Quick actions</p>
                <h2 className="h5 mb-0">Start here</h2>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                <ReactBootstrap.Button as={ReactRouterDom.Link} to="/assessment/new" variant="primary">
                  New Assessment
                </ReactBootstrap.Button>
                <ReactBootstrap.Button as={ReactRouterDom.Link} to="/assessment/list" variant="outline-secondary">
                  Assessment List
                </ReactBootstrap.Button>
                <ReactBootstrap.Button variant="outline-danger" onClick={handleLogout}>Log Out</ReactBootstrap.Button>
              </div>
            </div>
          </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
      </ReactBootstrap.Col>
    </ReactBootstrap.Row>
  </ReactBootstrap.Container>;
};
