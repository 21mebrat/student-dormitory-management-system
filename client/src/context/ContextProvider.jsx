import React, { createContext, useContext, useState } from 'react'
 const authContext = createContext()
export const useAuth =()=> useContext(authContext)
const ContextProvider = ({children}) => {
    const [auth,setAuth] = useState({})
  return (
    <authContext.Provider value={
      {
        setAuth,
        auth
      }
    }>
        {children}
    </authContext.Provider>
  )
}

export default ContextProvider
