import { useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import getDb from "../firebase/getDb";

function useGetNovedades(CD) {
  const [db] = getDb();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const traerData = async () => {
    try {
      const q = query(
        collection(db, "novedades"),
        limit(15),
        orderBy("fechaCreacion", "desc"),
        where("cd", "==", CD)
      );
      const items = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const tempData = { key: doc.id, data: doc.data() };
        items.push(tempData);
      });
      setData(items);
    } catch (error) {
      alert("Erorr leyendo novedades.");
      console.log(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    traerData();
  }, []);
  return [data, loading, setData];
}

export default useGetNovedades;
