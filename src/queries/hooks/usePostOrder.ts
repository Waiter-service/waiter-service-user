import { useMutation } from "@tanstack/react-query";
import { postOrder } from "../postOrder";
import { toast } from "react-toastify";

export const usePostOrder = () => {
  return useMutation({
    mutationFn: postOrder,
    onSuccess: (data) => {
      toast.success("Order posted successfully!");
    },
    onError: (error) => {
      console.error("Error posting order:", error);
    },
  });
};
