import React, { useState } from "react";
import { Formik } from "formik";
import agregarSku from "../../firebase/agregarSku";
import Titulo from "../../components/Titulo/Titulo";
import CustomButton from "../../components/CustomButton/CustomButton";
import Loading from "../../components/Loading/Loading";
import "./NuevoSku.css";

function NuevoSku() {
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const skudata = {
    sku: "",
    tipo: "",
    descripcion: "",
    unidades: "",
  };
  const handleImagen = (event) => {
    const pesoMb = event.currentTarget.files[0].size / 1000000;
    console.log(pesoMb + "Mb");
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
  return (
    <div>
      <Titulo>Agregar SKU</Titulo>
      <Loading loading={loading}>
        <Formik
          initialValues={skudata}
          validate={(values) => {
            const errors = {};
            if (!values.sku) {
              errors.sku = "SKU OBLIGATORIO";
              alert("Complete todos los campos");
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            if (
              values.sku == "" ||
              values.tipo == "" ||
              values.descripcion == "" ||
              values.unidades == ""
            ) {
              alert("Complete todos los campos");
            } else {
              agregarSku(values, imagen, resetForm, setImagen, setLoading);
            }
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            /* and other goodies */
          }) => (
            <div className="nuevosku-container">
              <form className="nuevosku-form">
                <div className="box-input">
                  <input
                    type="number"
                    name="sku"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sku}
                    className="formik-input"
                    placeholder="Código SKU"
                  />
                </div>
                <div className="box-input">
                  <input
                    type="text"
                    name="tipo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tipo}
                    className="formik-input"
                    placeholder="Tipo"
                  />
                </div>
                <div className="box-input">
                  <input
                    type="text"
                    name="descripcion"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.descripcion}
                    className="formik-input-descripcion"
                    placeholder="Descripción"
                  />
                </div>
                <div className="box-input">
                  <input
                    type="number"
                    name="unidades"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.unidades}
                    placeholder="Unidades por bulto"
                    className="formik-input"
                  />
                </div>
                <h3 className="formik-img-subir">
                  Por favor subí una imagen cuadrada y que pese menos de 0.3Mb
                  <br></br>
                  <a href="https://imagecompressor.com/es/" target={"_blank"}>
                    Acá podés comprimir el tamaño de la imagen
                  </a>
                </h3>
                <div className="formik-img-subir">
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleImagen}
                    className="cargar-sku"
                  />
                  {imagen && (
                    <img
                      src={URL.createObjectURL(imagen)}
                      alt=""
                      width="200px"
                      height="200px"
                    />
                  )}
                </div>
                <CustomButton text="Agregar Nuevo SKU" onClick={handleSubmit} />
              </form>
            </div>
          )}
        </Formik>
      </Loading>
    </div>
  );
}

export default NuevoSku;
