// MenuComponent.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../SessionContext';

const MenuComponent = () => {
  const { isLoggedIn, logout } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirigir al usuario a la página de inicio de sesión después de cerrar sesión
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
        <Link to="/login">Iniciar sesión</Link>
      )}
    </div>
  );
};

export default MenuComponent;
