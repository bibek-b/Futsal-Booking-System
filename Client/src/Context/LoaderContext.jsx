import { useState } from "react";
import { createContext } from "react";

export const LoaderContext = createContext();

export const LoaderContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => {
    setIsLoading(true);
  };
  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};