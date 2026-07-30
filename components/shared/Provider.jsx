import React from "react";
import { Toaster } from "react-hot-toast";

// Provider component for using toasts throughout the project
const Provider = ({ children }) => {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      {children}
    </div>
  );
};

export default Provider;
