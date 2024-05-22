import { useState, useEffect, createContext } from "react";
import { createUser, loginUser, tokenRefresh } from "../services/serviceRoutes/userServices";

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

  const loginUserAuth = async (payload) => {
    try {
      const response = await loginUser(payload)
      if (response.ok) {
        console.log(`successfully logged in user ${response.data}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const registerUserAuth = async (payload) => {
    try {
      const response = await createUser(payload)
      if (response.ok) {
        console.log(`successfully logged in user ${response.data}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{isUserLoggedIn, setIsUserLoggedIn, authLoading, loginUserAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

