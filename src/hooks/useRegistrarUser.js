import { useState } from "react";
import { initializeApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase/firebaseConfig";

const useRegistrarUser = () => {
  const [loading, setLoading] = useState(false);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const tempApp = initializeApp(firebaseConfig, "tempApp");
  const tempAppAuth = getAuth(tempApp);

  const crearUserFirestore = (uid, objeto) => {
    const db = getFirestore(app);
    setDoc(doc(db, "usuarios", uid), objeto)
      .then(() => {
        alert(`Usuario ${objeto.nombre} ${objeto.apellido} registrado.`);
        setLoading(false);
      })
      .catch();
  };

  const registrarUser = (
    { nombre, apellido, password, dni, ol, rol, CD, sector },
    cleanForm
  ) => {
    setLoading(true);
    const mail = dni + "_choferescmq@miruta.com";
    let passOk;
    let permisos = "OL";
    if (ol == "CMQ") {
      passOk = password;
      permisos = "CMQ";
    } else {
      passOk = "123456";
    }
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      dni.trim() === "" ||
      passOk.trim() === ""
    ) {
      window.alert("Complete todos los campos");
      return;
    }
    createUserWithEmailAndPassword(tempAppAuth, mail, passOk)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;
        const email = user.email;
        const objeto = {
          nombre: nombre,
          apellido: apellido,
          dni: dni,
          ol: ol,
          rol: rol,
          uid: uid,
          email: email,
          CD: CD,
          permisos: permisos,
          sector: sector,
        };
        crearUserFirestore(mail, objeto);
        cleanForm();
      })
      .catch((error) => {
        const errorMessage = error.message;
        window.alert("Error al registrar el usuario " + errorMessage);
      })
      .finally(() => {
        tempAppAuth.signOut().then(() => deleteApp(tempApp));
      });
  };

  return { loading, registrarUser };
};

export default useRegistrarUser;
