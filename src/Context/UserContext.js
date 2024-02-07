import React from 'react';
import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [search, setSearch] = useState([])
  const [genders, setGenders] = useState([])  
  const [users, setUsers] = useState([])
  const [month, setMonth] = useState()
  const [inDate, setInDate] = useState()
  const [changeRows, setChangeRows] = useState()
  const [userIds, setUserIds] = useState()


  return (
    <UserContext.Provider value={{search, setSearch,genders, setGenders,users, setUsers,month, setMonth,inDate, setInDate,changeRows, setChangeRows,userIds, setUserIds}}>
      {children}
    </UserContext.Provider>
  );
};