import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login     from './components/Login';
import Signup    from './components/Signup';
import Dashboard from './components/Dashboard';
import './index.css'  

function App() {
  // 1️⃣ keep the auth flag in state
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem('token'))
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          // 2️⃣ pass setIsLoggedIn as the onLogin prop
          element={
            isLoggedIn
              ? <Navigate to="/" replace />
              : <Login onLogin={() => setIsLoggedIn(true)} />
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn
              ? <Navigate to="/" replace />
              : <Signup />
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn
              ? <Dashboard />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
