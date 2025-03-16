import { createContext, useContext, useEffect, useState } from "react";
import { DeleteUser, LoginUser, UpdateUser } from "../services/userService";
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
    navigate("/login");
  };

  const deleteAccount = async () => {
    await DeleteUser(user._id)
      .then(({ data }) => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        toast.success(data);
        navigate("/register");
      })
      .catch((err) => {
        toast.error("Error deleting account");
      });
  };

  const updateUserProfile = async (userData) => {
    await UpdateUser({...userData, id: user._id}).then(({data})=>{
      setToken(data.token);
      const user = jwtDecode(data.token);
      setUser(user);
      toast.success(data.message)
    }).catch((err)=>{
      console.log(err)
      toast.error("Error updating user profile")
    })
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, deleteAccount, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
