import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/users/login', {
        username, email, password
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
        onLogin();        // 🔥 notify App that we’re now logged in
        navigate('/');    // 🚪 go to Dashboard
      } else {
        setError('No token returned');
        localStorage.removeItem('token');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
         <label>
          Username
          <input 
            type="username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required 
          />
        </label>
        <label>
          Email
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </label>

        <label>
          Password
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <p>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
