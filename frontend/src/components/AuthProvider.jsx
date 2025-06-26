// AuthProvider.jsx
import React, { useState, useEffect, createContext } from 'react';
import {
  userSignup,
  userLogin,
  userLogout,
  checkLogin
} from '../apis';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user,  setUser]   = useState(null);
  const [error, setError]  = useState('');

  const signup = async creds => {
    setError('');
    const newUser = await userSignup(creds);
    if (newUser) {
      setUser(newUser);
      return true;
    } else {
      setError('Signup failed');
      return false;
    }
  };

  const login = async creds => {
    setError('');
    const loggedInUser = await userLogin(creds);
    if (loggedInUser) {
      setUser(loggedInUser);
      return true;
    } else {
      setError('Login failed');
      return false;
    }
  };

  const logout = () => {
    userLogout();
      setUser(null);
  };

  useEffect(() => {
    // on mount, if there's a token, you could fetch /me to rehydrate the user:
    const {token,user} = checkLogin();
    if (token) {
      setUser(user);

    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, error, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
