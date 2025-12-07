import React from "react";

const Loading = () => {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <span className="loading loading-spinner loading-lg text-primary"></span>

        {/* Text */}
        <p className="mt-4 text-lg font-semibold text-primary">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
