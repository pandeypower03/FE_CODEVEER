import React, {useContext} from "react";
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthProvider";


const Dashboard = () => {
 const { user,logout } =useContext(AuthContext)
  const navigate = useNavigate();

  const handlelogout=()=>{
  logout();
  navigate('/')
}

  return (
   <> 
   <p>  hello iam dashboard</p>
   <p>{user.email}</p>
   <button onClick={handlelogout}>Log Out</button>
  

   </>
  );
};

export default Dashboard;