/* eslint-disable no-unused-vars */
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDom from 'react-router-dom';

export const Navigation = () =>
  <header>
    <ReactBootstrap.Navbar expand="md" bg="dark" variant="dark" fixed="top" className="shadow-sm border-bottom border-dark-subtle">
      <ReactBootstrap.Container>
        <ReactBootstrap.Navbar.Brand as={ReactRouterDom.Link} to="/" className="fw-semibold tracking-wide">OCAT</ReactBootstrap.Navbar.Brand>
        <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
          <ReactBootstrap.Nav className="me-auto">
            <ReactBootstrap.Nav.Link as={ReactRouterDom.Link} to="/">Dashboard</ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link as={ReactRouterDom.Link} to="/assessment/new">
              New Assessment
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link as={ReactRouterDom.Link} to="/assessment/list">
              Assessment List
            </ReactBootstrap.Nav.Link>
          </ReactBootstrap.Nav>
        </ReactBootstrap.Navbar.Collapse>
      </ReactBootstrap.Container>
    </ReactBootstrap.Navbar>
  </header>;
