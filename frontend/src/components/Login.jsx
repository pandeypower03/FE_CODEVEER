
import React, { useContext, useState ,useEffect} from 'react';
import { AuthContext } from './AuthProvider.jsx';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user ,login, error} =useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    login({ username, email, password });
  }

  useEffect(()=>{
    if(user){
      navigate('/dashboard/')
    }
  },[user,navigate])
  

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
            onChange={e => setName(e.target.value)} 
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
     <Link to ="/signup" className="link">
        Don't have an account? Sign Up</Link>
    </div>
  );
}
