import { useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { clearCurrentUser, getCurrentUser } from '../../utils/auth';

export const DashboardBulletin = () => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const nav = useNavigate();

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

  return <Navbar bg="light" expand="md">
    <Navbar.Brand as={Link} to="/">OCAT Dashboard</Navbar.Brand>
    <Navbar.Toggle aria-controls="dashboard-nav" />
    <Navbar.Collapse id="dashboard-nav">
      <Nav className="me-auto">
        {currentUser ?
            <>
            <Nav.Item>
                <span className="navbar-text">Welcome, {currentUser.firstName || currentUser.username}!</span>
              </Nav.Item>
            <Nav.Link as="button" onClick={handleLogout} className="btn btn-link">Log Out</Nav.Link>
          </> : null}
      </Nav>
    </Navbar.Collapse>
  </Navbar>;
};
