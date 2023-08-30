import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);
  const token = localStorage.getItem("voter-access-token");

  useEffect(() => {
    axios
      .get(
        `https://data-sphere-portal-server-site.vercel.app/users/admin/${user?.email}`,
        {
          headers: { authorization: `bearer ${token}` },
        }
      )
      .then((res) => {
        setIsAdmin(res.data);
      });
  }, []);
  return [isAdmin, setIsAdmin];
};
export default useAdmin;
