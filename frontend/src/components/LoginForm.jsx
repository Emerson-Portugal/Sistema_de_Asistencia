//LoginForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(dni, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        DNI:
        <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
      <Link to="/register">Register</Link>
    </form>
  );
};

export default LoginForm;
