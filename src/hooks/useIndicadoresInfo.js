import { useState, useEffect, useContext } from "react";
import getDb from "../firebase/getDb";
import { getDoc, setDoc, doc } from "firebase/firestore";
import UserContext from "../context/UserContext";
import {
  arrayToObject,
  objectToArray,
} from "../utilities/convertirIndicadores";
import {
  objetoIndicadores,
  objetoIndicadoresWH,
} from "../utilities/arrayIndicadores";

function useIndicadoresInfo() {
  const [db, app] = getDb();
  const { userData } = useContext(UserContext);
  const [indicadoresArray, setIndicadoresArray] = useState([]);
  const [indicadoresObjeto, setIndicadoresObjeto] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIndicadores = async () => {
    const docRef = doc(db, "indicadoresInfo", userData.CD);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setIndicadoresArray(docSnap.data().indicadoresArray);
      setIndicadoresObjeto(arrayToObject(docSnap.data().indicadoresArray));
      setLoading(false);
    } else {
      if (userData.sector == "wh") {
        updateIndicadoresInfo(objetoIndicadoresWH);
      } else {
        updateIndicadoresInfo(objetoIndicadores);
      }
    }
  };

  const updateIndicadoresInfo = (obj) => {
    setLoading(true);
    const array = objectToArray(obj);
    setDoc(doc(db, "indicadoresInfo", userData.CD), { indicadoresArray: array })
      .then(() => {
        alert("Actualizado correctamente");
      })
      .catch((e) => {
        console.log(e);
        alert("Error");
      })
      .finally(() => {
        getIndicadores();
        setLoading(false);
      });
  };

  useEffect(() => {
    userData.CD && getIndicadores();
  }, [userData]);

  return {
    indicadoresArray,
    indicadoresObjeto,
    setIndicadoresObjeto,
    updateIndicadoresInfo,
    loading,
  };
}

export default useIndicadoresInfo;
