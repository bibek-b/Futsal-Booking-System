import { useContext } from "react";
import { createContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { useEffect } from "react";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [booking, setBooking] = useState([]);
  const [socket, setSocket] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      const newSocket = io.connect("http://localhost:5000");

      setSocket(newSocket);

      //cleanup function
      return () => {
        newSocket.disconnect();
      };
    }
  }, [token]);

  useEffect(() => {
    if (!socket) return;
    //receive the booking status & update

    const handleReceiveBooking = (data) => {
      setBooking((prev) => [...prev, data]);
    };

    socket.on("receive-booking", handleReceiveBooking);

    return () => {
      socket.off("receive-booking", handleReceiveBooking);
    };
  }, [socket]);

  //if click the book now btn - send the booking and user info
  const sendBooking = (userId, startTime, date) => {
    if (socket) {
      socket.emit("send-booking", { userId, startTime, date });
    }
  };

  const removeBooking = (startTime) => {
    if (socket) {
      socket.emit("remove-booking", { startTime });
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, sendBooking, booking, removeBooking }}
    >
      {children}
    </SocketContext.Provider>
  );
};
