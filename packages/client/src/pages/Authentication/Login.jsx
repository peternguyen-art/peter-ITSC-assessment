// packages/client/src/pages/Auth/Login.jsx
import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, setCurrentUser } from '../../utils/auth';
import { UserService } from '../../services/UserService';

export const Login = () => {
  const [ formData, setFormData ] = useState({ password: ``, username: `` });
  const [ error, setError ] = useState(null);
  const navigate = useNavigate();

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

  return <Card>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </Form.Group>

      <Button type="submit">Log In</Button>
      {error ? <p>{error}</p> : null}
      <p>
        Don't have an account?
        <Link to="/signup">Sign up</Link>
      </p>
    </Form>
  </Card>;
};
