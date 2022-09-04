import React, { useState } from "react";
import NavItem from "./NavItem/NavItem";
import "./NavCol.css";
import { FaRegNewspaper } from "react-icons/fa";
import { IoBeerOutline } from "react-icons/io5";
import { FiTarget, FiExternalLink } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

function NavCol() {
  const { userData } = useContext(UserContext);
  const permisos = userData.permisos;
  const route = useLocation().pathname;
  let navigate = useNavigate();
  const [dropdown, setdDropdown] = useState({
    feedbacks: false,
    sku: false,
    novedades: false,
    usuarios: false,
    links: false,
    indicadores: false,
  });

  const Cmq = () => {
    if (permisos === "CMQ" || permisos === "administrador") {
      return (
        <>
          <span
            className="navcol-link"
            onClick={() =>
              setdDropdown({
                ...dropdown,
                novedades: !dropdown.novedades,
              })
            }
          >
            <FaRegNewspaper style={{ marginRight: "1rem", fontSize: 20 }} />{" "}
            Novedades
          </span>
          {dropdown.novedades && (
            <>
              <NavItem to="/cargarNovedad" text="Cargar" route={route} />
              <NavItem to="/novedades" text="Visualizar" route={route} />
            </>
          )}
          <span
            className="navcol-link"
            onClick={() =>
              setdDropdown({
                ...dropdown,
                sku: !dropdown.sku,
              })
            }
          >
            {" "}
            <IoBeerOutline style={{ marginRight: "1rem", fontSize: 20 }} /> SKUs
          </span>
          {dropdown.sku && (
            <>
              <NavItem to="/nuevosku" text="Agregar" route={route} />
              <NavItem to="/buscarsku" text="Buscar/Editar" route={route} />
            </>
          )}
        </>
      );
    }
  };

  const Administrador = () => {
    if (permisos === "administrador") {
      return (
        <>
          <span
            className="navcol-link"
            onClick={() =>
              setdDropdown({
                ...dropdown,
                usuarios: !dropdown.usuarios,
              })
            }
          >
            {" "}
            <AiOutlineUser style={{ marginRight: "1rem", fontSize: 20 }} />
            Usuarios
          </span>

          {dropdown.usuarios && (
            <>
              <NavItem to="/registro" text="Registrar Usuario" route={route} />
              {/* <NavItem to="/" text="Editar Usuario" /> */}
            </>
          )}
          <span
            className="navcol-link"
            onClick={() =>
              setdDropdown({
                ...dropdown,
                links: !dropdown.links,
              })
            }
          >
            <FiExternalLink style={{ marginRight: "1rem", fontSize: 20 }} />
            Links
          </span>
          {dropdown.links && (
            <>
              <NavItem to="/cargarlinks" text="Agregar" route={route} />
              <NavItem to="/links" text="Ver/Editar" route={route} />
            </>
          )}
          <span
            className="navcol-link"
            onClick={() =>
              setdDropdown({
                ...dropdown,
                indicadores: !dropdown.indicadores,
              })
            }
          >
            {" "}
            <FiTarget style={{ marginRight: "1rem", fontSize: 20 }} />{" "}
            Indicadores
          </span>

          {dropdown.indicadores && (
            <>
              <NavItem to="/indicadores" text="Cargar" route={route} />
              <NavItem
                to="/gestionindicadores"
                text="Gestionar"
                route={route}
              />
            </>
          )}
        </>
      );
    }
  };

  return (
    <div className="navcol-container">
      <Cmq />
      <Administrador />
    </div>
  );
}

export default NavCol;
