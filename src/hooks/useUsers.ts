
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface IServiceQuery {
  searchTerm?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const useUsers = (params?: IServiceQuery) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:3005/api/user",
        {
          params: {
            searchTerm: params?.searchTerm,
            sort: params?.sort,
            page: params?.page,
            limit: params?.limit,
          },
        }
      );
      return res.data;
    },
  });

  return { isPending, error, data, refetch };
};