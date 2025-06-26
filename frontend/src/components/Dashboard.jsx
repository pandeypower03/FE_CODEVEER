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
console.log(user)
const parseduser= JSON.parse(user)
console.log(parseduser)

  return (
   <> 
   <p>  hello iam dashboard</p>
   
   {user && 
   <p>{parseduser.username}</p>}
   <button onClick={handlelogout}>Log Out</button>
  

   </>
  );
};

export default Dashboard;