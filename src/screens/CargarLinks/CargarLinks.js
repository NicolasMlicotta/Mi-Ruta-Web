import React, { useState } from "react";
import useCdLinks from "../../hooks/useCdLinks";
import Loading from "../../components/Loading/Loading";
import styles from "./CargarLinks.module.css";
import Titulo from "../../components/Titulo/Titulo";

function CargarLinks() {
  const { cargarLink, loading } = useCdLinks();
  const [inputValues, setInputValues] = useState({
    texto: "",
    url: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValues.texto == "" || inputValues.url == "") {
      alert("Complete todos los campos");
      return;
    } else {
      cargarLink(inputValues);
      setInputValues({ texto: "", url: "" });
    }
  };
  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.container}>
      <Titulo>Agregar Links</Titulo>
      <Loading loading={loading}>
        <form className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="texto"
            placeholder="Texto del link"
            value={inputValues.texto}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            type="text"
            name="url"
            placeholder="Link (https://...)"
            value={inputValues.url}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Agregar</button>
        </form>
      </Loading>
    </div>
  );
}

export default CargarLinks;
