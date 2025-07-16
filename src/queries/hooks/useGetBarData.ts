import { useQuery } from "@tanstack/react-query";
import { getBarData } from "../getBarData";

export const useBarData = (barId: number) => {
  return useQuery({
    queryKey: ["barData", barId], 
    queryFn: () => getBarData(barId),
    enabled: !!barId,
    staleTime: 1000 * 60 * 5, 
    retry: 2, 
  });
};