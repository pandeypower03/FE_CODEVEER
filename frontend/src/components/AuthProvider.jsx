import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';  
import { createContext } from 'react';
import { userSignup, userLogin,checkLogin,userLogout } from '../apis';
export const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const login = ({ name, email, password }) => {
       console.log("Login data:", { name, email, password });
       const data = userLogin({ name, email, password });
       if(data){
        setUser({email , name: "amit kumar"})
          return true;
       }
       else{
         setError('Email or password is incorrect');
         return false;
       }

    }

    const signup =  ({ name, email, password }) => {
       console.log("Signup data:", { name, email, password });
        const isSignup=userSignup({ name, email, password })
        if (isSignup) {
            setUser({email , name: "amit kumar"})
           return true;
    }
    else{
        setError('User already exists');
        return false;
    }
}
    
    const logout = () => {
        userLogout();
        setUser(null);
    }

useEffect(()=>{
    const user = checkLogin();
    if(user){
        setUser({email:user , name:"amit kumar"});
    }
},[]);


    
    return(
       <AuthContext.Provider value={{ error, user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
