export const serverUrl = () => {
  const API_URL = import.meta.env.VITE_SERVER_URL;

  return { API_URL };
};