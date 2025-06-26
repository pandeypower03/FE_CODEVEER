import React, {useContext} from "react";
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthProvider";


const Dashboard = () => {
  
 const { user,logout } =useContext(AuthContext)
//  let parsedUser =
//   typeof user === 'string'
//     ? JSON.parse(user)
//     : (typeof user === 'object' && user !== null)
//     ? user
//     : {};

 
  const navigate = useNavigate();
  console.log(user)
  console.log(typeof(user))
  
  const handlelogout=()=>{
  logout();
  navigate('/')
}

  return (
   <> 
   <p>  hello iam dashboard</p>
   
   {user && 
   <p>{user.username}</p>}
   <button onClick={handlelogout}>Log Out</button>
  

   </>
  );
};

export default Dashboard;