import { useState, useEffect, createContext } from "react";
import {
  createUser,
  loginUser,
  tokenRefresh,
} from "../services/serviceRoutes/userServices";
import { removeToken, setToken } from "../services/apiToken";
import { useNavigate } from "react-router-dom"; 

export const AuthContext = createContext(null);

export const AuthContextComponent = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const intializeContext = async () => {
      try {
        const isUserValid = await tokenRefresh();
        if (isUserValid.status === 200) {
          setIsUserLoggedIn(true);
          setToken(isUserValid.data.access)
        }
      } catch (error) {
        if (error.response.status === 401) {
          console.log("not logged in");
        } else {
          console.error("initialization error", error);
        }
      } finally {
        setAuthLoading(false);
      }
    };
    intializeContext();
  }, []);

  const loginUserAuth = async (payload) => {
    try {
      const response = await loginUser(payload);
      if (response.status === 200) {
        setToken(response.data.access);
        setIsUserLoggedIn(true);
        console.log(
          `successfully logged in user ${response.data.user.username}`
        );
        console.log("redirect?")
        navigate("/browse")
      }
     } catch (error) {
      console.log(error);
    }
  
}

  const createUserAuth = async (payload) => {
    try {
      const response = await createUser(payload);
      if (response.status === 200) {
        setIsUserLoggedIn(true);
        setToken(response.data.access);
        console.log(
          `successfully registered user ${response.data.user.username}`
        );
      }
      navigate("/browse")
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    removeToken();
    setIsUserLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        authLoading,
        loginUserAuth,
        createUserAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
