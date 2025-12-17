import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";

import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, Loading } = useContext(AuthContext);
  const location = useLocation();

  if (Loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <BarLoader color="#5e5feb" size={20} /> */}
        <p>Loading..........</p>
      </div>
    );
  }
  
  if (user ) {
    return children;
  }
  // return <Navigate state={location.pathname} to="/login"></Navigate>;
  return <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;
