import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedMyBookings = ({ children }) => {
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, [token, navigate]);

  if (!token) return null;

  return children;
};

export default ProtectedMyBookings;
