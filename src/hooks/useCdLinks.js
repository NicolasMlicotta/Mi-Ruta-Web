import { useState, useEffect, useContext } from "react";
import getDb from "../firebase/getDb";
import { getDoc, setDoc, doc } from "firebase/firestore";
import UserContext from "../context/UserContext";

function useCdLinks() {
  const [db, app] = getDb();
  const { userData } = useContext(UserContext);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLinks = async () => {
    const docRef = doc(db, "links", userData.CD);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().linksArray) {
        setLinks(docSnap.data().linksArray);
      } else {
        setLinks([]);
      }
      return;
    }
  };

  const cargarLink = (newLink) => {
    setLoading(true);
    let arrayOfLinks = links;
    arrayOfLinks.push(newLink);
    setDoc(doc(db, "links", userData.CD), { linksArray: arrayOfLinks })
      .then(() => {
        alert("Cargado correctamente");
      })
      .catch((e) => {
        console.log(e);
        alert("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateLinks = (array) => {
    setLoading(true);
    setDoc(doc(db, "links", userData.CD), { linksArray: array })
      .then(() => {
        alert("Borrado correctamente");
      })
      .catch((e) => {
        console.log(e);
        alert("error");
      })
      .finally(() => {
        getLinks();
        setLoading(false);
      });
  };

  useEffect(() => {
    userData.CD && getLinks();
  }, [userData]);

  return { links, setLinks, cargarLink, loading, updateLinks };
}

export default useCdLinks;
