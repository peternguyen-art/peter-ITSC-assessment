/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDom from 'react-router-dom';
import { getCurrentUser, setCurrentUser } from '../../utils/auth';
import { UserService } from '../../services/UserService';

export const Signup = () => {
  const [ formData, setFormData ] = useState({
    firstName: ``,
    lastName: ``,
    password: ``,
    passwordConfirm: ``,
    username: ``,
  });
  const [ error, setError ] = useState(null);
  const navigate = ReactRouterDom.useNavigate();

  useEffect(() => {
    if (getCurrentUser()) {
      navigate(`/dashboard`, { replace: true });
    }
  }, [ navigate ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      setError(`Passwords do not match`);
      return;
    }

    try {
      const user = await UserService.signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
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
      <ReactBootstrap.Col md={10} lg={8} xl={7}>
        <ReactBootstrap.Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-primary text-white p-4 p-md-5">
            <p className="text-uppercase small mb-2 opacity-75">Create your account</p>
            <h1 className="h3 mb-2">Sign up for OCAT</h1>
            <p className="mb-0 text-white-50">Get access to the assessment dashboard in a few quick steps.</p>
          </div>
          <ReactBootstrap.Card.Body className="p-4 p-md-5 bg-white">
            <ReactBootstrap.Form onSubmit={handleSubmit} className="d-grid gap-3">
              <ReactBootstrap.Row className="g-3">
                <ReactBootstrap.Col md={6}>
                  <ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Label>First Name</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control
                      name="firstName"
                      placeholder="First name"
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </ReactBootstrap.Form.Group>
                </ReactBootstrap.Col>
                <ReactBootstrap.Col md={6}>
                  <ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Label>Last Name</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control
                      name="lastName"
                      placeholder="Last name"
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </ReactBootstrap.Form.Group>
                </ReactBootstrap.Col>
              </ReactBootstrap.Row>

              <ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Label>Username</ReactBootstrap.Form.Label>
                <ReactBootstrap.Form.Control
                  name="username"
                  placeholder="Choose a username"
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </ReactBootstrap.Form.Group>

              <ReactBootstrap.Row className="g-3">
                <ReactBootstrap.Col md={6}>
                  <ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Label>Password</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control
                      name="password"
                      type="password"
                      placeholder="Minimum 8 characters"
                      minLength={8}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </ReactBootstrap.Form.Group>
                </ReactBootstrap.Col>
                <ReactBootstrap.Col md={6}>
                  <ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Label>Confirm Password</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control
                      name="passwordConfirm"
                      type="password"
                      placeholder="Re-enter password"
                      onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                      required
                    />
                  </ReactBootstrap.Form.Group>
                </ReactBootstrap.Col>
              </ReactBootstrap.Row>

              {error ? <ReactBootstrap.Alert variant="danger" className="mb-0">{error}</ReactBootstrap.Alert> : null}

              <ReactBootstrap.Button type="submit" size="lg" className="w-100">Create Account</ReactBootstrap.Button>
            </ReactBootstrap.Form>
          </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
      </ReactBootstrap.Col>
    </ReactBootstrap.Row>
  </ReactBootstrap.Container>;
};
