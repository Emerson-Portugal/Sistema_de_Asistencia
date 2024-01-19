import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SupportForm from "./components/SupportForm";
import AcceptApplication from "./components/AcceptApplication";
import "./App.css";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [jefes, setJefes] = useState([]);
  const [selectedOption, setSelectedOption] = useState("support");
  const [showButtons, setShowButtons] = useState(true);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setShowButtons(false);
  };

  const handleReturnToMain = () => {
    setSelectedOption(""); // Esto evita que una opción esté preseleccionada al volver al menú principal
    setShowButtons(true); // Restablece el estado de showButtons
  };

  useEffect(() => {
    obtenerJefes();
  }, []);

  const obtenerJefes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/jefes");
      if (response.ok) {
        const data = await response.json();
        setJefes(data);
      } else {
        console.error("Error al obtener la lista de jefes");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleLogin = async (dni, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dni, password }),
      });

      if (response.ok) {
        setLoggedIn(true);
      } else {
        console.error("Error de autenticación");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud de autenticación:", error);
    }
  };

  const handleSupport = (formData) => {
    // Lógica para manejar el formulario de soporte
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <div className="App">
              {!isLoggedIn ? (
                <LoginForm
                  onLogin={(dni, password) => handleLogin(dni, password)}
                />
              ) : (
                <div>
                  <h1>Bienvenido</h1>
                  <div>
                    {showButtons && (
                      <>
                        <Link to="/support">
                          <button onClick={() => handleOptionChange("support")}>
                            Support Form
                          </button>
                        </Link>
                        <Link to="/accept">
                          <button onClick={() => handleOptionChange("accept")}>
                            Accept Application
                          </button>
                        </Link>
                      </>
                    )}
                    <Link to="/" onClick={handleReturnToMain}>
                      Volver al menú principal
                    </Link>
                  </div>
                  <Outlet />
                </div>
              )}
            </div>
          }
        />
        <Route
          path="/support"
          element={
            <SupportForm
              onReturnToMain={handleReturnToMain}
              onSubmit={handleSupport}
              jefes={jefes}
            />
          }
        />

        <Route
          path="/accept"
          element={<AcceptApplication onReturnToMain={handleReturnToMain} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
