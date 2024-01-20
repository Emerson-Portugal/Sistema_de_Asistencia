// SessionContext.js
import React, { createContext, useState, useContext } from 'react';

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  const login = (token) => {
    setAccessToken(token);
  };

  const logout = () => {
    setAccessToken(null);
  };

  return (
    <SessionContext.Provider value={{ accessToken, login, logout }}>
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