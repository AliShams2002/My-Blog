import React from "react";
import { Toaster } from "react-hot-toast";

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
