import React, {useContext} from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";





const Solve = () => {
      const navigate = useNavigate();
    
  
    const { user, logout } = useContext(AuthContext)
    
  const handlelogout = () => {
    logout();
    navigate("/");
  };
    //  let parsedUser =
    //   typeof user === 'string'
    //     ? JSON.parse(user)
    //     : (typeof user === 'object' && user !== null)
    //     ? user
    //     : {};

 

    return (
      <>
        <p> hello iam in solve</p>
        {user && <p>{user.username}</p>}
            <button onClick={handlelogout}>Log Out</button>
            
      </>
    );
};

export default Solve;