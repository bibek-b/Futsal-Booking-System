import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedAdminRoutes = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded);

      if (decoded.role !== "admin") {
        return navigate("/");
      }
    } else {
      return navigate("/");
    }
  }, [token, navigate]);

  if (!isAdmin) return null;

  return children;
};

export default ProtectedAdminRoutes;
