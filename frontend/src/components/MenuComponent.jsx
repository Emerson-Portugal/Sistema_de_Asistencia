// MenuComponent.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../SessionContext';

const MenuComponent = () => {
  const { accessToken, user, logout } = useSession();  // Agrega user aquí
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirect the user to the login page after logging out
    navigate('/login');
  };

  return (
    <div>
      <h1>Menú Principal</h1>
      {accessToken ? (
        <>
          <Link to="/support">Soporte</Link>
          <br/>
          {user && user.id_cargo === 7 && <Link to="/accept">Aceptar Solicitud</Link>}
          <br/>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar Sesión</Link>
        </>
      )}
    </div>
  );
};

export default MenuComponent;
