import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

  return <Card>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          name="firstName"
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="lastName"
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password (min 8 chars)</Form.Label>
        <Form.Control
          name="password"
          type="password"
          minLength={8}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          name="passwordConfirm"
          type="password"
          onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
          required
        />
      </Form.Group>

      <Button type="submit">Create Account</Button>
      {error ? <p>{error}</p> : null}
    </Form>
  </Card>;
};
