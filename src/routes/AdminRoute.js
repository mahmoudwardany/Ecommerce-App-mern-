import { useState, useEffect } from "react";
import { useAuth } from "../reducers/AuthContext";
import axios from "axios";
import Spinner from "./Spinner";

export default function AdminRoute({ children }) {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get("https://ecomnode.onrender.com/api/v1/auth/admin");
      if (data?.message === 'success') {
        setOk(true)
      } else {
        setOk(false)
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? children : <Spinner path="" />;
}