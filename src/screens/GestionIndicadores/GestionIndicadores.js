import React from "react";
import Loading from "../../components/Loading/Loading";
import Titulo from "../../components/Titulo/Titulo";
import useIndicadoresInfo from "../../hooks/useIndicadoresInfo";
import styles from "./GestionIndicadores.module.css";

function GestionIndicadores() {
  const {
    indicadoresArray,
    indicadoresObjeto,
    setIndicadoresObjeto,
    loading,
    updateIndicadoresInfo,
  } = useIndicadoresInfo();
  const handleHabilitado = (e, indicador) => {
    const boolean = e.target.value == "true" ? true : false;
    setIndicadoresObjeto({
      ...indicadoresObjeto,
      [indicador]: {
        indicador: indicadoresObjeto[indicador].indicador,
        texto: indicadoresObjeto[indicador].texto,
        descripcion: indicadoresObjeto[indicador].descripcion,
        flag: indicadoresObjeto[indicador].flag,
        habilitado: boolean,
        mostrarPosicion: indicadoresObjeto[indicador].mostrarPosicion,
      },
    });
  };
  const handlePosicion = (e, indicador) => {
    const boolean = e.target.value == "true" ? true : false;
    setIndicadoresObjeto({
      ...indicadoresObjeto,
      [indicador]: {
        indicador: indicadoresObjeto[indicador].indicador,
        texto: indicadoresObjeto[indicador].texto,
        descripcion: indicadoresObjeto[indicador].descripcion,
        flag: indicadoresObjeto[indicador].flag,
        habilitado: indicadoresObjeto[indicador].habilitado,
        mostrarPosicion: boolean,
      },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateIndicadoresInfo(indicadoresObjeto);
  };

  return (
    <div>
      <Titulo>Gestión de Indicadores</Titulo>
      <Loading loading={loading}>
        <form className={styles.formulario}>
          {indicadoresArray.map(({ indicador, texto, habilitado }, index) => {
            return (
              <div className={styles.selects} key={index}>
                <label htmlFor={indicador}>
                  {texto} {habilitado}
                </label>
                <select
                  name={indicador}
                  id={indicador}
                  onChange={(e) => handleHabilitado(e, indicador)}
                  value={indicadoresObjeto[indicador].habilitado}
                >
                  <option value={true}>Habilitado</option>
                  <option value={false}>Deshabilitado</option>
                </select>
                <select
                  name={indicador}
                  id={indicador}
                  onChange={(e) => handlePosicion(e, indicador)}
                  value={indicadoresObjeto[indicador].mostrarPosicion}
                >
                  <option value={true}>Mostrar Posición</option>
                  <option value={false}>No Mostrar Posición</option>
                </select>
              </div>
            );
          })}
          <button onClick={handleSubmit}>Guardar</button>
        </form>
      </Loading>
    </div>
  );
}

export default GestionIndicadores;
