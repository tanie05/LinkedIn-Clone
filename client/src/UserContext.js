import {createContext, useEffect, useState} from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {

  const storedUser = localStorage.getItem('user')
  
  const value = storedUser ?  JSON.parse(storedUser) : {flag: false} ;
  const [userInfo,setUserInfo] = useState(value);



  return (
    <UserContext.Provider value={{userInfo,setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}