/* eslint-disable no-unused-vars */
// packages/client/src/pages/Auth/Login.jsx
import { useEffect, useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDom from 'react-router-dom';
import { getCurrentUser, setCurrentUser } from '../../utils/auth';
import { UserService } from '../../services/UserService';

export const Login = () => {
  const [ formData, setFormData ] = useState({ password: ``, username: `` });
  const [ error, setError ] = useState(null);
  const navigate = ReactRouterDom.useNavigate();

  useEffect(() => {
    if (getCurrentUser()) {
      navigate(`/dashboard`, { replace: true });
    }
  }, [ navigate ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await UserService.login({
        password: formData.password,
        username: formData.username,
      });

      setCurrentUser(user);

      navigate(`/dashboard`);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    }
  };

  return <ReactBootstrap.Container className="py-5">
    <ReactBootstrap.Row className="justify-content-center align-items-center min-vh-100">
      <ReactBootstrap.Col md={10} lg={8} xl={6}>
        <ReactBootstrap.Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-dark text-white p-4 p-md-5">
            <p className="text-uppercase small mb-2 opacity-75">Welcome back</p>
            <h1 className="h3 mb-2">Log in to OCAT</h1>
            <p className="mb-0 text-white-50">Access your dashboard and manage assessments from one place.</p>
          </div>
          <ReactBootstrap.Card.Body className="p-4 p-md-5 bg-white">
            <ReactBootstrap.Form onSubmit={handleSubmit} className="d-grid gap-3">
              <ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Label>Username</ReactBootstrap.Form.Label>
                <ReactBootstrap.Form.Control
                  name="username"
                  placeholder="Enter your username"
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </ReactBootstrap.Form.Group>

              <ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Label>Password</ReactBootstrap.Form.Label>
                <ReactBootstrap.Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </ReactBootstrap.Form.Group>

              {error ? <ReactBootstrap.Alert variant="danger" className="mb-0">{error}</ReactBootstrap.Alert> : null}

              <ReactBootstrap.Button type="submit" size="lg" className="w-100">Log In</ReactBootstrap.Button>

              <div className="text-center small text-muted">
                Don't have an account?
                {` `}
                <ReactRouterDom.Link to="/signup">Sign up</ReactRouterDom.Link>
              </div>
            </ReactBootstrap.Form>
          </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
      </ReactBootstrap.Col>
    </ReactBootstrap.Row>
  </ReactBootstrap.Container>;
};
