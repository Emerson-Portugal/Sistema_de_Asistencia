import React, { createContext, useState, useEffect, useContext } from 'react';

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verifica la validez del token almacenado en localStorage al cargar la aplicación
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);

      // También puedes realizar una solicitud al backend para obtener información del usuario usando el token
      // y luego actualizar el estado del usuario con setUser(userData);
    }
  }, []);

  const login = (token, userData) => {
    setAccessToken(token);
    setUser(userData);

    // Almacena el token en localStorage para persistencia
    localStorage.setItem('accessToken', token);
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);

    // Elimina el token almacenado al cerrar sesión
    localStorage.removeItem('accessToken');
  };

  const isLoggedIn = !!accessToken;

  return (
    <SessionContext.Provider value={{ accessToken, user, login, logout, isLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export { SessionProvider, useSession, SessionContext };
