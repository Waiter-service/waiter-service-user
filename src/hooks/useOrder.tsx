import { connectSocket, getOrdersByTableId } from "@/utils/socket/socket";
import { useEffect, useState, useRef } from "react";
import { z } from "zod";

const ordersResponseSchema = z.array(
  z.object({
    id: z.number(),
    tableId: z.number(),
    status: z.string(),
    barId: z.number(),
    comment: z.string().nullable(),
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
  const [orders, setOrders] = useState<{
    id: number;
    tableId: number;
    status: string;
    barId: number;
    comment: string | null;
    date: string;
    total: number;
    OrderArticle: {
      articleId: number;
      quantity: number;
    }[];
  }[] | []>([]);

  const isInitialFetch = useRef(true); 

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

    const interval = setInterval(() => {
      fetchOrders();

      if (isInitialFetch.current) {
        isInitialFetch.current = false;
        clearInterval(interval);
        setTimeout(() => {
          setInterval(fetchOrders, 6000); 
        }, 0);
      }
    }, isInitialFetch.current ? 1 : 6000); 

    return () => clearInterval(interval);
  }, [tableId]);

  return orders;
};

export default useOrders;