import React, { useContext, useState, useEffect } from "react";
import "./CargarIndicadores.css";
import uploadData from "../../firebase/uploadData";
import Titulo from "../../components/Titulo/Titulo";
import CustomButton from "../../components/CustomButton/CustomButton";
import Loading from "../../components/Loading/Loading";
import UserContext from "../../context/UserContext";
import sheetsInfo from "../../utilities/sheetsInfo";
import uploadDataWH from "../../firebase/uploadDataWH";

function CargarIndicadores() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sheetInfo, setSheetInfo] = useState({});
  const { userData } = useContext(UserContext);

  const handleUpload = () => {
    if (!checked) {
      window.alert("Confirmá con el check");
      return;
    } else if (userData.sector == "wh") {
      uploadDataWH(setLoading, sheetInfo.id);
      return;
    } else {
      uploadData(setLoading, sheetInfo.id);
      return;
    }
  };
  useEffect(() => {
    if (userData) {
      setLoading(false);
      setSheetInfo({
        link: sheetsInfo[userData.CD].link,
        id: sheetsInfo[userData.CD].sheetId,
      });
    }
  }, [userData]);

  return (
    <div className="cargar-indicadores-wrapper">
      <Titulo>Cargar Indicadores</Titulo>
      <Loading loading={loading}>
        <div className="cargar-feedbacks-container">
          <p className="mensaje">
            1) Cargá los datos en el sheet<br></br>
            2) Hacé click en el botón “Subir Indicadores” en esta página.
            <br></br>
            <br></br>
            Para actualizar un valor cargalo de nuevo con la fecha
            correspondiente y se sobreescribirán los datos.
          </p>
          <a
            style={{
              marginBlock: "2rem",
              fontSize: "1.4rem",
              textAlign: "left",
            }}
            href={sheetInfo.link}
            target={"_blank"}
          >
            {`Google Sheet ${userData.CD}`}
          </a>
          <div className="cargar-container">
            <div className="cargar-checkbox">
              <input
                type="checkbox"
                id="scales"
                name="scales"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="cargar-hover"
              />
              <label htmlFor="scales" className="cargar-label">
                Ya completé el sheet
              </label>
            </div>
            <CustomButton text="Subir Indicadores" onClick={handleUpload} />
          </div>
        </div>
      </Loading>
    </div>
  );
}

export default CargarIndicadores;
