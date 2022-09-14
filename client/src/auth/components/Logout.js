import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";


export default function Logout() {
  const {logout} = useAuthContext();
  useEffect(()=> logout());

  return null;
}