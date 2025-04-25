import { useQuery } from "@tanstack/react-query";
import { projectServices } from "../services/project.services";

const useProjects = (filters: { name: string; value: string }[]) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["projects", filters],
    queryFn: () => projectServices.fetchProjects(filters),
    refetchOnWindowFocus: false,
  });

  return { ...data?.data, isLoading, isFetching };
};

export default useProjects;
