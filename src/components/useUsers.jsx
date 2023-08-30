import axios from "axios";
import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://data-sphere-portal-server-site.vercel.app/users")
      .then((res) => {
        setUsers(res.data);
      });
  }, []);
  return [users, setUsers];
};
export default useUsers;
