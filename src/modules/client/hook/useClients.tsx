import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "../resources";

const useClients = (filters: { name: string; value: string }[]) => {
  const { data, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ["clients", filters],
    queryFn: () => fetchClients(filters),
    refetchOnWindowFocus: false,
  });

  return { ...data?.data, isLoading, isFetching, isSuccess };
};

export default useClients;
