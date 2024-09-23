import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const signIn = async (Email, Password) => {
    const res = await axios.post("http://localhost:3002/signin", { Email, Password });
    if (res.data.success === "false") {
      setCurrentUser(null);
    } else {
      setCurrentUser(res.data);
    }

  }

    const hospitalSignIn = async (Email, Password) => {
      const res = await axios.post("http://localhost:3004/hospital", { Email, Password });
      if (res.data.success === "false") {
        setCurrentUser(null);
      } else {
        setCurrentUser(res.data);
      }
  
    }

    const companySignIn = async (Email, Password) => {
      const res = await axios.post("http://localhost:3008/company", { Email, Password });
      if (res.data.success === "false") {
        setCurrentUser(null);
      } else {
        setCurrentUser(res.data);
      }
  
    }

  const logout = async () => {
    await axios.post("http://localhost:3002/logout");
    setCurrentUser(null);
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, signIn, logout, hospitalSignIn, companySignIn }}>
      {children}
    </AuthContext.Provider>
  )
}