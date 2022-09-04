import React, { useContext } from "react";
import Novedad from "../../components/Novedad/Novedad";
import Titulo from "../../components/Titulo/Titulo";
import Loading from "../../components/Loading/Loading";
import borrarNovedad from "../../firebase/borrarNovedad";
import useGetNovedades from "../../hooks/useGetNovedades";
import UserContext from "../../context/UserContext";
import "./Novedades.css";

function Novedades() {
  const { userData } = useContext(UserContext);
  const [data, loading, setData] = useGetNovedades(userData.CD);

  const handleBorrar = (docId, imgId) => {
    if (borrarNovedad(docId, imgId)) {
      const newData = data.filter((dato) => dato.key != docId);
      window.alert("Borrado correctamente");
      setData(newData);
    } else {
      window.alert("Error borrando los datos");
    }
  };

  return (
    <div>
      <Titulo>Novedades</Titulo>
      <Loading loading={loading}>
        <div>
          {data.map((doc, index) => {
            return (
              <Novedad
                key={index}
                data={doc.data}
                docId={doc.key}
                handleBorrar={handleBorrar}
              />
            );
          })}
        </div>
      </Loading>
    </div>
  );
}

export default Novedades;
