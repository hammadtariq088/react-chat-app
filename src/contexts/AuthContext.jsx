import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

const authContext = React.createContext() // to gather the user info

const useAuth = () => {
  return useContext(authContext) // grab the all contexts which used later on using custom HOOk
}

const AuthContext = ({ children }) => {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      // grabbing the user from the firebase authentication
      setUsers(user)
      setLoading(false)
      if (user) {
        // if user exist then move to chat page
        navigate('/chats')
      }
    })
  }, [users, navigate])

  const value = { users }

  return (
    <authContext.Provider value={value}>
      {loading === false ? children : null}
    </authContext.Provider>
  )
}

export default AuthContext

export { useAuth }