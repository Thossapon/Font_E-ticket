import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null));
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [suckUser,setSuckUser] = useState({});

  const login = async (inputs) => {
    try {
      const res = await axios.post("http://172.16.10.151:8800/api/auth/login", inputs, { withCredentials: true })
      setCurrentUser(res.data);
      setSuckUser(res.data);
      localStorage.setItem('isLoggedIn', true);
    } catch (error) {
      console.log(error);
    }
  }
  const logout = async () => {
    setLoggedIn(false);
    localStorage.removeItem('user');
    setCurrentUser(null)
    try {
      await axios.post('http://172.16.10.151:8800/api/auth/logout');
      redirect('/login');
    } catch (error) {
      console.log(error.response.data)
    }
  }
  const fakeLogout = async () => {
    
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ login, currentUser, logout ,suckUser}}>
      {children}
    </AuthContext.Provider>
  )
}