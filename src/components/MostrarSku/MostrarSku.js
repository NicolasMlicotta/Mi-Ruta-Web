import React from "react";
import "./MostrarSku.css";
import { IoBeer } from "react-icons/io5";
import colors from "../../utilities/colors";
import { BiEdit } from "react-icons/bi";
import LinkSinEstilos from "../LinkSinEstilos/LinkSinEstilos";

function MostrarSku({ data }) {
  return (
    <div className="mostrar-sku-container">
      <ul>
        <li className="sku-item">SKU: {data?.idsku}</li>
        <li className="sku-item">Tipo: {data?.Tipo}</li>
        <li className="sku-item">Descripción: {data?.Descripcion}</li>
        <li className="sku-item">Unidades por bulto: {data?.UnidadesBulto}</li>
        <div className="sku-mostrar-img">
          {data?.ImgUrl == null ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IoBeer size={60} color={colors.titleBackground} />
              <p>Imagen no disponible</p>
            </div>
          ) : (
            <img src={data?.ImgUrl} alt="" height="300px" width="300px" />
          )}
        </div>
      </ul>
      {data.sku != "" && (
        <LinkSinEstilos to="/editarsku" state={data}>
          <div className="mostrarsku-editbutton">
            <p>Editar</p>
            <BiEdit size={24} />
          </div>
        </LinkSinEstilos>
      )}
    </div>
  );
}

export default MostrarSku;
