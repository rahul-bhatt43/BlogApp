import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {usercontext} from '../Context/UserContext'
// import {usegetuserInfo} from '../hooks/UserInfo'

export default function Protectlogin() {
    const {isAuth} = useContext(usercontext)

  if (isAuth) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
}