import getDb from "./getDb";
import { doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

const borrarNovedad = async (docId, imgId) => {
  const [db] = getDb();
  const storage = getStorage();
  const path = "imagenesnovedades/" + imgId;
  const imgRef = ref(storage, path);

  const deleteDocumento = async () => {
    try {
      await deleteDoc(doc(db, "novedades", docId));
      return true;
    } catch (err) {
      window.alert("Error al borrar documento.", err);
      return false;
    }
  };

  if (imgId) {
    // Delete the file
    deleteObject(imgRef)
      .then(() => {
        // File deleted successfully
        deleteDocumento();
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        window.alert("Error al borrar imagen.", error);
        return false;
      });
  } else {
    deleteDocumento();
  }
};

export default borrarNovedad;
