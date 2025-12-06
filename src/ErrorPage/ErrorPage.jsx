import React from "react";
import { Link } from "react-router";


const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-primary">404</h1>

      <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>

      <p className="text-gray-500 max-w-sm mt-2">
        The page you are trying to reach does not exist or has been moved.
      </p>

      <Link to="/" className="btn btn-primary mt-6">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
