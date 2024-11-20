import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const ExclusiveContext = createContext();

export const ContextProvider = ({ children }) => {
  const [productView, setProductView] = useState("");
  const [userId, setUserId] = useState("");
  const auth = getAuth();

  // Fetch and set the user ID when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("User ID (UID):", user.uid);
        setUserId(user.uid);
      } else {
        // console.log("No user is signed in.");
        setUserId("");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <ExclusiveContext.Provider
      value={{ productView, setProductView, userId, setUserId }}
    >
      {children}
    </ExclusiveContext.Provider>
  );
};

export default ExclusiveContext;
