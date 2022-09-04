import { useState, useContext } from "react";
import getDb from "../firebase/getDb";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UserContext from "../context/UserContext";

function useCargarNovedad(setImagen) {
  const [db, app] = getDb();
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserContext);

  const AgregarNovedad = async ({ titulo, texto }, imagen) => {
    setLoading(true);
    const CD = userData.CD;
    const date = Date();
    let objeto = {
      cd: CD,
      fecha: date,
      titulo: titulo,
      texto: texto,
      imgurl: null,
      fechaCreacion: serverTimestamp(),
      imgId: null,
    };
    if (imagen != null) {
      uploadImage(imagen, objeto);
    } else {
      SubirDoc(objeto);
    }
  };

  const uploadImage = (imagen, objeto) => {
    var id = Math.random().toString() + objeto.titulo;
    objeto.imgId = id;
    const storage = getStorage(app);
    const ruta = "imagenesnovedades/" + id;
    const reference = ref(storage, ruta);

    uploadBytes(reference, imagen)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        objeto.imgurl = downloadURL;
        SubirDoc(objeto);
      });
  };

  const SubirDoc = (objeto) => {
    addDoc(collection(db, "novedades"), objeto)
      .then(() => {
        setLoading(false);
        alert("Cargado correctamente");
        setImagen(null);
      })
      .catch(setLoading(false));
  };

  return { AgregarNovedad, loading };
}

export default useCargarNovedad;
