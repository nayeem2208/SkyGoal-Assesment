// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(()=>{
    if(localStorage.getItem('SkyUser')){
        setUser(localStorage.getItem('SkyUser'))
    }
  },[])

  return (
    <AuthContext.Provider value={{ user,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};