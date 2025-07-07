import { useMutation } from "@tanstack/react-query";
import { postOrder } from "../postOrder";


export const usePostOrder = () => {
  return useMutation({
    mutationFn: postOrder, 
    onSuccess: (data) => {
      console.log("Order posted successfully:", data);
    },
    onError: (error) => {
      console.error("Error posting order:", error);
    },
  });
};
