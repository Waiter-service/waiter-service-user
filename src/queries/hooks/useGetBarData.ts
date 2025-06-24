import { useQuery } from "@tanstack/react-query";
import { getBarData } from "../getBarData";

export const useBarData = (barId: number) => {
  return useQuery({
    queryKey: ["barData", barId], // Unique key for caching
    queryFn: () => getBarData(barId), // Fetch function
    enabled: !!barId, // Only fetch if barId is valid
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry failed requests up to 2 times
  });
};