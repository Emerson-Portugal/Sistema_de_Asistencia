// SessionContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Al cargar la aplicación, verifica si hay un token en el almacenamiento local
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      // Puedes hacer una solicitud al servidor para obtener más información del usuario si es necesario
      // setUser(...);
    }
  }, []);

  const login = (token) => {
    setLoggedIn(true);
    // Puedes hacer una solicitud al servidor para obtener más información del usuario si es necesario
    // setUser(...);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <SessionContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
