import { useState, useEffect, createContext, useContext } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import getUser from "../firebase/getUser";

const UserContext = createContext({});

export function AuthProvider({ children }) {
  const auth = getAuth();
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(true);

  const setUserInfo = async (email) => {
    const info = await getUser(email);
    setUserData(info);
    setLoading(false);
  };

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserInfo(user.email);
        setLoading(true);
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    return unsuscribe;
  }, []);

  function login(dni, password) {
    setLoading(true);
    const email = dni + "_choferescmq@miruta.com";
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
      })
      .catch((error) => {
        window.alert("Error iniciando sesión");
        console.log(error);
        setLoading(false);
      });
  }

  function logout() {
    signOut(auth);
    setUserData(false);
    alert("Sesión cerrada");
  }

  const value = {
    userData,
    login,
    logout,
    loading,
    setUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
