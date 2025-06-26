import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthProvider.jsx';
import { Link , useNavigate} from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, signup, error} =useContext(AuthContext);
  const navigate = useNavigate();

function handleSignup(e) {
  e.preventDefault();
  signup({ name, email, password });
};
 

  useEffect(()=>{
    if(user){
      navigate('/dashboard/')
    }
  },[user, navigate])
  

  

  return(
   <form onSubmit={handleSignup}>
        <label>
          Name
          <input 
            type="text" 
            value={name} 
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
         <Link to ="/" className="link">
        Already have an account? Login</Link>
      </form>
      
  )
}

