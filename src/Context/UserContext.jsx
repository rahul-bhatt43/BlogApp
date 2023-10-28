import { useState, createContext } from "react";

const usercontext = createContext({});

const UserContext = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isAuth, setIsAuth] = useState(false);
  
    // Function to toggle authentication and set userInfo from local storage
    const toggleAuth = (authState) => {
      if (authState) {
        // User is authenticated
        const authData = JSON.parse(localStorage.getItem('auth'));
        setUserInfo(authData);
      } else {
        // User is logged out, clear userInfo
        setUserInfo({});
        localStorage.removeItem('auth');
      }
  
      setIsAuth(authState);
    };
  
    return (
      <usercontext.Provider value={{ userInfo, setUserInfo, isAuth, toggleAuth }}>
        {children}
      </usercontext.Provider>
    );
  }
  

export { usercontext, UserContext };