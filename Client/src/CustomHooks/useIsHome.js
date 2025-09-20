import { useLocation } from "react-router-dom";

export const useIsHome = () => {
  const location = useLocation();

  return location.pathname === "/";
};
