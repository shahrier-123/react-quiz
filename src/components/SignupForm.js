import { Link, useHistory } from 'react-router-dom';
import useForm from './Base/useForm';
import Button from './Button';
import Checkbox from './Checkbox';
import Form from './Form';
import TextInput from './TextInput';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function SignupForm() {
  const { inputs, handleChange, resetForm } = useForm({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: '',
  });

  const { signUp } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      setError("Password doesn't matched!");
      return;
    }

    try {
      setError('');
      setLoading(true);

      await signUp(inputs.email, inputs.password, inputs.username);
      history.push('/');
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setLoading(false);
    }

    resetForm();
  }

  return (
    <Form style={{ height: '500px' }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter name"
        name="username"
        icon="person"
        required
        value={inputs.username}
        onChange={handleChange}
      />

      <TextInput
        type="text"
        required
        name="email"
        placeholder="Enter email"
        icon="alternate_email"
        value={inputs.email}
        onChange={handleChange}
      />

      <TextInput
        type="password"
        required
        name="password"
        placeholder="Enter password"
        icon="lock"
        value={inputs.password}
        onChange={handleChange}
      />

      <TextInput
        type="password"
        required
        name="confirmPassword"
        placeholder="Confirm password"
        icon="lock_clock"
        value={inputs.confirmPassword}
        onChange={handleChange}
      />

      <Checkbox
        required
        name="agree"
        text="I agree to the Terms &amp; Conditions"
        value={inputs.agree}
        onChange={handleChange}
      />

      <Button type="submit" disabled={loading}>
        <span>Submit Now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
