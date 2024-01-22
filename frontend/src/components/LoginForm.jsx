// LoginForm.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../SessionContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useSession();
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');

  // handleLogin function
  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.2.135:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni, password }),
      });

      console.log(response)

      if (response.ok) {
        const data = await response.json();
        login(data.access_token, data.user); 
        console.log(data.access_token, data.user); 
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
