import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.init";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [Loading,setLoading] = useState(true);
  

  const provider = new GoogleAuthProvider();

  const googleWithSignin =()=>{
    setLoading(true);
   return signInWithPopup(auth, provider)
  }
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const AuthData = {
    user,
    setUser,
    createUser,
    logout,
    login,
    googleWithSignin,
    setLoading,
    Loading
  };

  return <AuthContext value={AuthData}>{children}</AuthContext>;
};

export default AuthProvider;
