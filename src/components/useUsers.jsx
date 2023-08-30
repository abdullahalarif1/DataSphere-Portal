import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "https://data-sphere-portal-server-site.vercel.app/users"
      );
      return res.data;
    },
  });

  return [users, refetch];
};
export default useUsers;
