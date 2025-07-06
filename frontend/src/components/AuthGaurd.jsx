import React, { useEffect  } from "react";

import { Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { Link , useNavigate} from 'react-router-dom';
import {checkLogin} from '../apis';


//we will check here if the user is authenticated or not
//if not authenticated, redirect to login page  

const AuthGaurd = () => {
    // const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const { token, user } = checkLogin();
        if(!token || !user){
            navigate('/')
        }
    }
    ),[]
  return (
   <> 
   <Outlet />
   {/* This Outlet will render the child routes */} 
   </>
  );
};

export default AuthGaurd;