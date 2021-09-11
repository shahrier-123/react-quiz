import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useForm from './Base/useForm';
import Button from './Button';
import Form from './Form';
import TextInput from './TextInput';

export default function LoginForm() {
  const { handleChange, inputs } = useForm({
    email: '',
    password: '',
  });

  const { signIn } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);

      await signIn(inputs.email, inputs.password);
      history.push('/');
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Form style={{ height: '330px' }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter email"
        icon="alternate_email"
        required
        name="email"
        value={inputs.email}
        onChange={handleChange}
      />

      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        required
        name="password"
        value={inputs.password}
        onChange={handleChange}
      />

      <Button disabled={loading} type="submit">
        <span>Submit Now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}
