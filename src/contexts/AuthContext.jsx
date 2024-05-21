import { useState, useEffect, createContext } from "react";
import { tokenRefresh } from "../services/serviceRoutes/userServices";

export const AuthContext = createContext(null)

export const AuthContextComponent = ({children}) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const initializeConext = async () => {
      try {
        const isUserValid = await tokenRefresh()
        if (isUserValid.refresh) {
          setIsUserLoggedIn(true)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setAuthLoading(false)
      }
    }
    initializeConext()
  },[])

  return (
    <AuthContext.Provider value={{isUserLoggedIn, setIsUserLoggedIn, authLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

