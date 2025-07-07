import { connectSocket, getOrdersByTableId } from "@/utils/socket/socket";
import { useEffect, useState } from "react";
import { z } from "zod";

const ordersResponseSchema = z.array(
  z.object({
    id: z.number(),
    tableId: z.number(),
    status: z.string(),
    barId: z.number(),
    comment: z.string(),
    date: z.string(),
    total: z.number(),
    OrderArticle: z.array(
      z.object({
        articleId: z.number(),
        quantity: z.number(),
      })
    ),
  })
);

const useOrders = (tableId: number) => {
  const [orders, setOrders] = useState<
    {
      id: number;
      tableId: number;
      status: string;
      barId: number;
      comment: string;
      date: string;
      total: number;
      OrderArticle: {
        articleId: number;
        quantity: number;
      }[];
    }[]
  >([]);

  useEffect(() => {
    connectSocket();

    const fetchOrders = () => {
      getOrdersByTableId(tableId, (response) => {
        try {
          const validatedOrders = ordersResponseSchema.parse(response);
          setOrders(validatedOrders);
        } catch (error) {
          console.error("Invalid orders response:", error);
        }
      });
    };

    const interval = setInterval(
      () => {
        fetchOrders();
      },
      orders.length === 0 ? 1 : 10000
    );

    return () => clearInterval(interval);
  }, [orders.length, tableId]);

  return orders;
};

export default useOrders;
