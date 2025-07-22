import { waiterServiceApi } from ".";
import { z } from "zod";

const BarDataSchema = z.object({
  name: z.string(),
  image: z.string().nullable(),
  location: z.string().nullable(),
  description: z.string().nullable(),
  logo: z.string().nullable(),
  openingTime: z.string().nullable(),
  closingTime: z.string().nullable(),
  coordinateX: z.number().nullable(),
  coordinateY: z.number().nullable(),
  articles: z.array(
    z.object({
      id: z.number(),
      category: z.string().nullable(),
      title: z.string(),
      content: z.string(),
      price: z.number(),
      image: z.string().nullable(),
      status: z.string(),
    })
  ),
});

export const getBarData = async (barId: number) => {
  const res = await waiterServiceApi.get(`/bar/${barId}`);

  return BarDataSchema.parse(res.data);
};
