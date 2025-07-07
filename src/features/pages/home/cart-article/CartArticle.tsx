import { FC, useState } from "react";

import Image from "next/image";

import { PlusSvg } from "@/assets/icons";
import { useCart } from "@/providers/cart-provider";
import QuantitySelector from "@/components/quanity-selector";

interface CartArticleProps {
  article: {
    id: number;
    title: string;
    content: string;
    price: number;
    quantity?: number;
  };
}

const CartArticle: FC<CartArticleProps> = ({ article }) => {
  const { state, addToCart } = useCart();
  const [quantity, setQuantity] = useState(article.quantity || 1);
  console.log(state);

  return (
    <div
      key={article.id}
      className="md:bg-neutral-800 md:border-[1px] border-neutral-700 p-[10px] rounded-xl relative cursor-pointer"
    >
      <p>{article.title}</p>
      <p className="text-[14px] text-neutral-400">{article.content}</p>
      <div className="flex justify-between items-center w-[90%]">
        <p className="text-[var(--brand-green-light)] mt-[20px]">
          {article.price}€
        </p>
        <QuantitySelector
          onChange={(value) => {
            setQuantity(value);
            addToCart({
              ...article,
              quantity: value,
            });
          }}
          quantity={quantity}
          classname=" scale-75 translate-y-[10px]"
        />
      </div>
      <div className="absolute flex justify-center items-center top-[7px] right-[7px] bg-[var(--brand-green)] text-white rounded-bl-2xl rounded-tr-xl p-[5px] w-[39px] h-[39px] text-center">
        {quantity}
      </div>
    </div>
  );
};

export default CartArticle;
