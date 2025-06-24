import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login     from './features/auth/Login';
import Signup    from './features/auth/Signup';
import Dashboard from './features/pages/Dashboard';

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
