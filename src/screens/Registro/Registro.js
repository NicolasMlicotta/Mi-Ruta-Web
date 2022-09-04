import React, { useState, useContext, useEffect } from "react";
import "./Registro.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import UserContext from "../../context/UserContext";
import sheetsInfo from "../../utilities/sheetsInfo";
import Loading from "../../components/Loading/Loading";
import useRegistrarUser from "../../hooks/useRegistrarUser";

const Registro = () => {
  const [selectOL, setSelectOL] = useState("CMQ");
  const [options, setOptions] = useState([]);
  const [selectRol, setSelectRol] = useState("CMQ");
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const { userData } = useContext(UserContext);
  const { loading, registrarUser } = useRegistrarUser();

  useEffect(() => {
    if (userData) {
      setOptions(sheetsInfo[userData.CD].ol);
    }
  }, [userData]);

  const cleanForm = () => {
    setNombre("");
    setApellido("");
    setDni("");
    setPassword("");
  };

  const handleRegistration = () => {
    let sector = "del";
    if (userData.sector == "wh") {
      sector = "wh";
    }
    registrarUser(
      {
        nombre: nombre,
        apellido: apellido,
        password: password,
        dni: dni,
        ol: selectOL,
        rol: selectRol,
        CD: userData.CD,
        sector: sector,
      },
      cleanForm
    );
  };

  return (
    <div className="registro-container">
      {userData && (
        <>
          <h1>Registro de Usuarios</h1>
          <Loading loading={loading}>
            <div className="formulario">
              <input
                type="number"
                placeholder="DNI"
                className="input-text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />
              <input
                value={nombre}
                type="text"
                placeholder="Nombre"
                className="input-text"
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                value={apellido}
                type="text"
                placeholder="Apellido"
                className="input-text"
                onChange={(e) => setApellido(e.target.value)}
              />
              {selectOL === "CMQ" && (
                <input
                  value={password}
                  type="password"
                  placeholder="Contraseña"
                  className="input-text"
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
              <div className="registro-select-box">
                <label htmlFor="ol">Organización:</label>
                <select
                  name="ol"
                  id="ol"
                  onChange={(e) => setSelectOL(e.target.value)}
                  className="select-ol"
                  value={selectOL}
                >
                  <option value="CMQ">CMQ</option>
                  {options.map((opcion) => {
                    return (
                      <option key={opcion.value} value={opcion.value}>
                        {opcion.text}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="registro-select-box">
                <label htmlFor="rol">Rol en la organización:</label>
                <select
                  name="rol"
                  id="rol"
                  onChange={(e) => setSelectRol(e.target.value)}
                  className="select-ol"
                  value={selectRol}
                >
                  <option value="CMQ">CMQ</option>
                  <option value="Chofer">Chofer</option>
                  <option value="Ayudante">Ayudante</option>
                  <option value="Administrativo">Administrativo</option>
                  <option value="Deposito">Depósito</option>
                </select>
              </div>
              <div style={{ marginTop: "1.2rem" }}>
                <CustomButton
                  onClick={handleRegistration}
                  text="Registrar Usuario"
                />
              </div>
            </div>
          </Loading>
        </>
      )}
    </div>
  );
};

export default Registro;
