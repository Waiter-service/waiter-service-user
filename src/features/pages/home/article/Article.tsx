import { PlusSvg } from "@/assets/icons";
import { FC } from "react";
import Image from "next/image";
import { useCart } from "@/providers/cart-provider";
import { useDialogContext } from "@/providers/dialog/DialogProvider";

interface ArticleProps {
  article: {
    id: number;
    image: string | null;
    title: string;
    content: string;
    price: number;
  };
}

const Article: FC<ArticleProps> = ({ article }) => {
  const { addToCart, state } = useCart();
  const { open } = useDialogContext();
  const cartItem = state.articles.find((item) => item.id === article.id);

  return (
    <div
      key={article.id}
      className="md:bg-neutral-800 md:border-[1px] border-neutral-700 p-[10px] rounded-xl relative cursor-pointer"
      onClick={() => open("article", { article })}
    >
      <p>{article.title}</p>
      <p className="text-[14px] text-neutral-400">{article.content}</p>
      <p className="text-[var(--brand-green-light)] mt-[20px]">
        {article.price}€
      </p>
      {cartItem ? (
        <div className="absolute flex justify-center items-center top-[7px] right-[7px] bg-[var(--brand-green)] text-white rounded-bl-2xl rounded-tr-xl p-[5px] w-[39px] h-[39px] text-center">
          {cartItem.quantity}
        </div>
      ) : (
        <Image
          src={PlusSvg}
          alt="Plus Icon"
          width={39}
          height={39}
          className="cursor-pointer absolute top-[7px] p-[5px] right-[7px] bg-[var(--brand-green)] rounded-bl-2xl rounded-tr-xl"
          onClick={(event) => {
            event.stopPropagation();
            addToCart({
              ...article,
              quantity: 1,
            });
          }}
        />
      )}
    </div>
  );
};

export default Article;
