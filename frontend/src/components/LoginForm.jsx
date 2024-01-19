// LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../SessionContext';

const LoginForm = () => {
  const { login } = useSession();
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        login(token);
        navigate('/');
      } else {
        console.error('Error de autenticación');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de autenticación:', error);
    }
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
