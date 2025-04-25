import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../resources";

const useProjects = (filters: { name: string; value: string }[]) => {
  const { data, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ["projects", filters],
    queryFn: () => fetchProjects(filters),
    refetchOnWindowFocus: false,
  });

  return { ...data?.data, isLoading, isFetching, isSuccess };
};

export default useProjects;
