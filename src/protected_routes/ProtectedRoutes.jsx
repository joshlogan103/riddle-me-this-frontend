import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from 'react-router'
import Navbar from '../components/Navbar/Navbar'

const ProtectedRoutes = ({children}) => {
  const {isUserLoggedIn, authLoading} = useContext(AuthContext)

  if (authLoading) {
    return (
      <>
        <Navbar></Navbar>
      </>
    )
  }

  if (!isUserLoggedIn) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoutes