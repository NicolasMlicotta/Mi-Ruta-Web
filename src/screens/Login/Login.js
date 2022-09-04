import React, { useState, useContext } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import UserContext from "../../context/UserContext";
import Loading from "../../components/Loading/Loading";
import "./Login.css";

const Login = () => {
  const { userData, login, logout, loading } = useContext(UserContext);
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (dni === "") {
      alert("Escriba su dni");
      return;
    }
    if (password === "") {
      alert("Escriba su contraseña");
      return;
    }
    login(dni, password);
  };

  const handleLogout = () => {
    logout();
  };

  const handleDni = (e) => {
    setDni(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Loading loading={loading}>
        {!userData ? (
          <div className="formulario">
            <h1>Iniciar Sesión</h1>
            <div className="input-container">
              <input
                type="number"
                placeholder="DNI"
                className="input-text"
                value={dni}
                onChange={handleDni}
              />
              <input
                value={password}
                type="password"
                placeholder="Contraseña"
                className="input-text"
                onChange={handlePassword}
              />
            </div>

            <CustomButton
              onClick={handleLogin}
              text="Iniciar Sesión"
              size="large"
            />
          </div>
        ) : (
          <div>
            <div className="formulario-logout">
              <h1>{userData?.nombre + " " + userData?.apellido} </h1>
              <CustomButton
                onClick={handleLogout}
                text="Cerrar Sesión"
                size="large"
              />
            </div>
          </div>
        )}
      </Loading>
    </>
  );
};

export default Login;
