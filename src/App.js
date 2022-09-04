import React, { useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Header from "./components/Header/Header";
import CargarIndicadores from "./screens/Indicadores/CargarIndicadores";
import Registro from "./screens/Registro/Registro";
import Login from "./screens/Login/Login";
import BuscarSku from "./screens/BuscarSku/BuscarSku";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Novedades from "./screens/Novedades/Novedades";
import NavCol from "./components/NavCol/NavCol";
import NuevoSku from "./screens/NuevoSku/NuevoSku";
import CargarNovedad from "./screens/CargarNovedad/CargarNovedad";
import EditarSku from "./screens/EditarSku/EditarSku";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/UserContext";
import Links from "./screens/Links/Links";
import CargarLinks from "./screens/CargarLinks/CargarLinks";
import GestionIndicadores from "./screens/GestionIndicadores/GestionIndicadores";

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="app">
      <AuthProvider>
        <BrowserRouter initial>
          <Header toggle={toggle} setToggle={setToggle} />
          {toggle && <NavCol />}
          <div className="app-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                index
                path="/"
                element={
                  <PrivateRoute>
                    <Novedades />
                  </PrivateRoute>
                }
              />
              <Route
                path="/indicadores"
                element={
                  <PrivateRoute>
                    <CargarIndicadores />
                  </PrivateRoute>
                }
              />
              <Route
                path="/gestionindicadores"
                element={
                  <PrivateRoute>
                    <GestionIndicadores />
                  </PrivateRoute>
                }
              />
              <Route
                path="/nuevosku"
                element={
                  <PrivateRoute>
                    <NuevoSku />
                  </PrivateRoute>
                }
              />
              <Route
                path="/buscarsku"
                element={
                  <PrivateRoute>
                    <BuscarSku />
                  </PrivateRoute>
                }
              />
              <Route
                path="/registro"
                element={
                  <PrivateRoute>
                    <Registro />
                  </PrivateRoute>
                }
              />

              <Route
                path="/novedades"
                element={
                  <PrivateRoute>
                    <Novedades />
                  </PrivateRoute>
                }
              />
              <Route
                path="/CargarNovedad"
                element={
                  <PrivateRoute>
                    <CargarNovedad />
                  </PrivateRoute>
                }
              />
              <Route
                path="/editarsku"
                element={
                  <PrivateRoute>
                    <EditarSku />
                  </PrivateRoute>
                }
              />
              <Route
                path="/links"
                element={
                  <PrivateRoute>
                    <Links />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cargarlinks"
                element={
                  <PrivateRoute>
                    <CargarLinks />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
