import { createContext, useContext, useEffect, useState } from "react";
import { LoginUser } from "../services/userService";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const user = jwtDecode(token);
      setUser(user);
    } else {
      setUser(null);
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (userData) => {
    await LoginUser(userData)
      .then(({ data }) => {
        setToken(data);
        const user = jwtDecode(data);
        setUser(user);
        navigate("/");
        toast.success("Welcome, " + user.name);
        
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login")
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
