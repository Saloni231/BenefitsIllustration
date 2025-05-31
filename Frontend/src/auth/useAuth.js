import { useEffect, useState } from "react";
import api from "../axios/api"; // axios instance with baseURL, headers, etc.

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null

  useEffect(() => {
    api
      .get("/auth/validate")
      .then((response) => {
        setIsAuthenticated(response.data.authenticated); // true or false
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  return isAuthenticated;
};

export { useAuth };
