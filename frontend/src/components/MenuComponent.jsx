import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../SessionContext';

const MenuComponent = () => {
  const { isLoggedIn, logout } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirect the user to the login page after logging out
    navigate('/login');
  };

  return (
    <div>
      <h1>Menú Principal</h1>
      {isLoggedIn ? (
        <>
          <Link to="/support">Soporte</Link>
          <Link to="/accept">Aceptar Solicitud</Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar Sesión</Link>
          {/* Add more links or components for non-logged-in users if needed */}
        </>
      )}
    </div>
  );
};

export default MenuComponent;
