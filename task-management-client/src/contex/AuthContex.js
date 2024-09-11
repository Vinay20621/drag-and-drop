import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
export const AuthContext=createContext()

export function AuthProvider({children}) {
    const [openMode, setOpenModel] = useState(false);
  return (
   <AuthContext.Provider value={{
    openMode, setOpenModel,
   }}>
    {children}
   </AuthContext.Provider>
  )
}