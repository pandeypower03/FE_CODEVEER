import { createBrowserRouter } from "react-router-dom";
import Login from '../components/Login.jsx';
import Signup from '../components/Signup.jsx';
import Dashboard from '../components/Dashboard.jsx';
import AuthGaurd from '../components/AuthGaurd.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/dashboard/",
    element: <AuthGaurd/>,
    children: [
      {
      path: "/dashboard/",
     element: <Dashboard/>
      }
    ]
  }
]);

export default router;
    