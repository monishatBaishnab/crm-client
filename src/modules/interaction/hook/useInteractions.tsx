import { useQuery } from "@tanstack/react-query";
import { fetchInteractions } from "..";

const useInteractions = (filters: { name: string; value: string }[]) => {
  const { data, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ["interactions", filters],
    queryFn: () => fetchInteractions(filters),
    refetchOnWindowFocus: false,
  });

  return { ...data?.data, isLoading, isFetching, isSuccess };
};

export default useInteractions;
