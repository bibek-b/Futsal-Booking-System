import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { SocketContextProvider } from "./Context/SocketContext.jsx";
import { ToastContainer } from "react-toastify";
import { LoaderContextProvider } from "./Context/LoaderContext.jsx";
import GlobalLoader from "./Components/common/GlobalLoader.jsx";
import { ConfirmModalContextProvider } from "./Context/ConfirmModalContext.jsx";
import { ScrollLockContextProvider } from "./Context/ScrollLockContext.jsx";

createRoot(document.getElementById("root")).render(
  <ScrollLockContextProvider>
    <ConfirmModalContextProvider>
    <LoaderContextProvider>
    <AuthContextProvider>
    <SocketContextProvider>
      <StrictMode>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="light"
          pauseOnFocus
        />
        <GlobalLoader />
      </StrictMode>
    </SocketContextProvider>
  </AuthContextProvider>
  </LoaderContextProvider>
  </ConfirmModalContextProvider>
  </ScrollLockContextProvider>,
);
