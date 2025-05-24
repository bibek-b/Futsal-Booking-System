import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import apiRequest from "../API REQUEST/apiRequest";

const useFetchUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await apiRequest.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    token && getUser();
  }, [token]);
  return currentUser;
};

export default useFetchUser;
