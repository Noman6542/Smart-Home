import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";

import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user,loading } = useContext(AuthContext);
  const location = useLocation();
  
  
  if(loading){
    return ( <div className="flex justify-center items-center h-screen">
        < BarLoader color="#5e5feb" size={20} />
      </div>)
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
