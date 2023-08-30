import axios from "axios";
import { useEffect, useState } from "react";

const useVoters = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    axios
      .get("https://data-sphere-portal-server-site.vercel.app/voter-data")
      .then((res) => {
        setVoters(res.data);
      });
  }, []);
  return [voters, setVoters];
};
export default useVoters;
