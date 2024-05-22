import { useState, useEffect, createContext } from "react";
import {
  createUser,
  loginUser,
  tokenRefresh,
} from "../services/serviceRoutes/userServices";
import { removeToken, setToken } from "../services/apiToken";

export const AuthContext = createContext(null);

export const AuthContextComponent = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const initializeConext = async () => {
      try {
        const isUserValid = await tokenRefresh();
        if (isUserValid.refresh) {
          setIsUserLoggedIn(true);
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
    initializeConext();
  }, []);

  const loginUserAuth = async (payload) => {
    try {
      const response = await loginUser(payload);
      if (response.status === 200) {
        console.log(response.data.access);
        setToken(response.data.access);
        setIsUserLoggedIn(true);
        console.log(
          `successfully logged in user ${response.data.user.username}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

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
