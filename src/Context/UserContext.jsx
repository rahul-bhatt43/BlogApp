import { useState, createContext } from "react";

const usercontext = createContext({});

const UserContext = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isAuth, setIsAuth] = useState(false);
  
    
    const toggleAuth = (authState) => {
      if (authState) {
        
        const authData = JSON.parse(localStorage.getItem('auth'));
        setUserInfo(authData);
      } else {
        
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
