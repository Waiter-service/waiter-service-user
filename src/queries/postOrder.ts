import { z } from "zod";
import { waiterServiceApi } from ".";

const postOrderBodySchema = z.object({
  orderItems: z.array(
    z.object({
      articleId: z.number(),
      quantity: z.number().min(1, "Quantity must be at least 1"),
    })
  ),
  barId: z.number(),
  tableId: z.number(),
  total: z.number().min(0, "Total must be a positive number"),
  status: z.string(),
});

type UsePostOrderResponseSchema = {
  id: number;
  barId: number;
  tableId: number;
  status: string;
  date: string;
  total: number;
};

export const postOrder = async (
  orderData: unknown
): Promise<UsePostOrderResponseSchema> => {
  const parsedOrderData = postOrderBodySchema.parse(orderData);

  const response = await waiterServiceApi.post("/order", parsedOrderData);
  return response.data;
};
