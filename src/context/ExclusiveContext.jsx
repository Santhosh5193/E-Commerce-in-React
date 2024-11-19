import { createContext, useState } from "react";

const ExclusiveContext = createContext();

export const ContextProvider = ({ children }) => {
  const [productView, setProductView] = useState("");

  return (
    <ExclusiveContext.Provider value={{ productView, setProductView }}>
      {children}
    </ExclusiveContext.Provider>
  );
};

export default ExclusiveContext;
