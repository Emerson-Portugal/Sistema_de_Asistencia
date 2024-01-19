// LoginForm.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../SessionContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(SessionContext);
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Implement logic to send login request to the backend
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.access_token);
        navigate('/');
      } else {
        // Handle login failure
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          DNI:
          <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
