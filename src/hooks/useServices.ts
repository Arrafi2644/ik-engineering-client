
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface IServiceQuery {
  searchTerm?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const useServices = (params?: IServiceQuery) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["services", params], // ✅ important (cache handle করবে)
    queryFn: async () => {
      const res = await axios.get(
        "https://ikengineering.co.nz/api/service",
        // "http://localhost:3005/api/service",
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