// AcceptApplication.jsx
import React from "react";
import { Link } from "react-router-dom";

const AcceptApplication = ({ onReturnToMain }) => {
  const handleReturnToMain = () => {
    onReturnToMain(); 
  };

  return (
    <>
      <Link to="/" onClick={handleReturnToMain}>
        Volver al menú principal
      </Link>

      <h1> Enlace a los Permisos </h1>
    </>
  );
};

export default AcceptApplication;
