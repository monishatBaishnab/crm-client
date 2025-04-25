import { useQuery } from "@tanstack/react-query";
import { fetchReminders } from "../resources";

const useReminders = (filters: { name: string; value: string }[]) => {
  const { data, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ["reminders", filters],
    queryFn: () => fetchReminders(filters),
    refetchOnWindowFocus: false,
  });

  return { ...data?.data, isLoading, isFetching, isSuccess };
};

export default useReminders;
