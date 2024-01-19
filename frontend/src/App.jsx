// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SessionProvider } from './SessionContext';
import MenuComponent from './components/MenuComponent';
import SupportForm from './components/SupportForm';
import AcceptApplication from './components/AcceptApplication';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  return (
    <Router>
      <SessionProvider>
        <Routes>
          <Route path="/" element={<MenuComponent />} />
          <Route path="/support" element={<SupportForm />} />
          <Route path="/accept" element={<AcceptApplication />} />
          <Route path="/login" element={<LoginForm />} />
          {/* Add more routes as needed */}
        </Routes>
      </SessionProvider>
    </Router>
  );
}

export default App;