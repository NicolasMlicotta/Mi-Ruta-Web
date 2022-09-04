import React, { useState } from "react";
import "./CargarNovedad.css";
import Loading from "../../components/Loading/Loading";
import { Formik, Field } from "formik";
import Titulo from "../../components/Titulo/Titulo";
import CustomButton from "../../components/CustomButton/CustomButton";

import useCargarNovedad from "../../hooks/useCargarNovedad";

function CargarNovedad() {
  const [imagen, setImagen] = useState(null);
  const { AgregarNovedad, loading } = useCargarNovedad(setImagen);

  const handleImagen = (event) => {
    const pesoMb = event.currentTarget.files[0].size / 1000000;
    if (pesoMb < 0.3) {
      setImagen(event.currentTarget.files[0]);
    } else {
      window.alert(
        "La imagen supera 0.3Mb de peso. Por favor comprimila antes de subirla."
      );
      setImagen(null);
      return;
    }
  };

  const handleSubmit = (values) => {
    if (values.titulo != "") {
      AgregarNovedad(values, imagen);
    } else {
      window.alert("Complete título");
    }
  };

  return (
    <div>
      <Titulo>Cargar Novedad</Titulo>
      <Loading loading={loading}>
        <Formik
          initialValues={{ titulo: "", texto: "", cd: "seleccione" }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form>
              <input
                type="text"
                name="titulo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.titulo}
                placeholder="Título"
                className="novedad-input"
              />

              <Field
                as="textarea"
                name="texto"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.texto}
                placeholder="Texto"
                className="novedad-input-area"
              />
              <h3>
                Por favor subí una imagen que sea cuadrada y pese menos de 0.3
                Mb.
              </h3>
              <h3>
                <a href="https://imagecompressor.com/es/" target={"_blank"}>
                  Acá podés comprimir el tamaño de la imagen
                </a>
              </h3>
              <div className="novedad-input-file">
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleImagen}
                />
                {imagen && (
                  <img
                    src={URL.createObjectURL(imagen)}
                    alt=""
                    width="100px"
                    height="100px"
                  />
                )}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CustomButton onClick={handleSubmit} text="Cargar" />
              </div>
            </form>
          )}
        </Formik>
      </Loading>
    </div>
  );
}

export default CargarNovedad;
