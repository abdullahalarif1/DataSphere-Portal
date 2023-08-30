import axios from "axios";
import { useEffect, useState } from "react";

const useVoters = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/voter-data").then((res) => {
      setVoters(res.data);
    });
  }, []);
  return [voters, setVoters];
};
export default useVoters;
