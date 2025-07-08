import { CloseSvg } from "@/assets/icons";
import Button from "@/components/button/Button";
import QuantitySelector from "@/components/quanity-selector";
import { useCart } from "@/providers/cart-provider";
import { useDialogContext } from "@/providers/dialog/DialogProvider";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { z } from "zod";

export const articleDialogDataSchema = z.object({
  article: z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    price: z.number(),
    image: z.string().nullable(),
    status: z.string(),
  }),
});

export interface ArticleDialogDataSchema
  extends z.infer<typeof articleDialogDataSchema> {}

interface ArticleDialogProps {
  data: ArticleDialogDataSchema;
}

const ArticleDialog: FC<ArticleDialogProps> = ({ data }) => {
  const { addToCart, state, removeFromCart } = useCart();
  const { close } = useDialogContext();
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cartItem = state.articles.find((item) => item.id === data.article.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setIsInCart(true);
    } else {
      setQuantity(1);
      setIsInCart(false);
    }
  }, [state.articles, data.article.id]);

  const handleArticleAction = () => {
    if (quantity === 0) {
      removeFromCart(data.article.id);
    } else {
      addToCart({
        ...data.article,
        image: data.article.image ?? undefined,
        quantity,
      });
    }
    close();
  };

  return (
    <div className="md:max-w-[450px] md:h-fit w-full h-full bg-neutral-900 md:border-[1px] border-neutral-500 md:rounded-2xl md:p-[20px] flex flex-col justify-between">
      <div>
        <Image
          src={data.article.image || "/placeholder.png"}
          alt={data.article.title}
          width={400}
          height={200}
          className="w-full max-h-[240px] md:h-[200px] object-cover"
        />
        <Button
          variant="gray"
          className="absolute top-[15px] left-[15px] p-[7px]"
        >
          <Image
            src={CloseSvg}
            alt="Close Icon"
            width={20}
            height={20}
            onClick={close}
          />
        </Button>
        <div className="p-[20px]">
          <p className="text-[24px] mt-[10px]">{data.article.title}</p>
          <p className="text-[18px] ">{data.article.content}</p>
          <div className="flex flex-col w-full border-y-[1px] border-neutral-600 gap-[10px] text-[14px] text-neutral-400 py-[10px] mt-[10px]">
            <div className="flex items-center justify-between w-full">
              <p>Cijena bez PDV-a</p>
              <p>{data.article.price}€</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p>PDV</p>
              <p>{data.article.price}€</p>
            </div>
          </div>
          <div className="flex w-full justify-between items-center mt-[10px]">
            <p className="text-[14px]">Cijena s PDV-om</p>
            <p>{data.article.price}€</p>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-[20px] gap-[10px] p-[20px]">
        <QuantitySelector quantity={quantity} onChange={setQuantity} />
        <Button
          variant="green"
          className="w-[80%]"
          onClick={handleArticleAction}
        >
          {quantity === 0
            ? "Ukloni iz narudžbe"
            : isInCart
            ? "Ažuriraj narudžbu"
            : "Dodaj u narudžbu"}
        </Button>
      </div>
    </div>
  );
};

export default ArticleDialog;
