import { ArrowLeftSvg } from "@/assets/icons";
import Button from "@/components/button/Button";
import CartArticle from "@/features/pages/home/cart-article";
import { useCart } from "@/providers/cart-provider";
import { useDialogContext } from "@/providers/dialog/DialogProvider";
import { usePostOrder } from "@/queries/hooks/usePostOrder";
import Image from "next/image";
import { useState } from "react";

const CartDialog = () => {
  const { state, clearCart } = useCart();
  const { close } = useDialogContext();
  const { mutate } = usePostOrder();
  const [comment, setComment] = useState<string>("");

  const totalPrice = state.articles.reduce(
    (total, article) => total + article.price * article.quantity,
    0
  );

  const handleOrder = () => {
    const orderDetails = {
      orderItems: state.articles.map((article) => ({
        articleId: article.id,
        quantity: article.quantity,
      })),
      total: totalPrice,
      tableId: 1,
      barId: 2,
      status: "PENDING",
      comment: comment || null,
    };

    mutate(orderDetails, {
      onSuccess: () => {
        alert("Order placed successfully!");
        clearCart();
        close();
      },
      onError: (error) => {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
      },
    });
  };

  return (
    <div className="w-full h-full bg-neutral-900 px-[10px] overflow-scroll">
      <div className="max-w-[1440px] ml-auto mr-auto">
        <div className="w-full flex justify-between items-center py-[30px]">
          <Button
            variant="darkGray"
            className="p-[7px] flex gap-[5px]"
            onClick={close}
          >
            <Image src={ArrowLeftSvg} alt="Close Icon" width={16} height={16} />
            <p className="hidden md:block">Vrati se na meni</p>
          </Button>
          <p className="font-[700] text-[22px]">Vasa Narudzba</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-[20px] gap-[20px]">
          {state.articles.length > 0 ? (
            state.articles.map((article) => (
              <CartArticle
                key={article.id}
                article={{
                  ...article,
                  quantity: article.quantity || 1,
                  content: article.content || "",
                }}
              />
            ))
          ) : (
            <p className="text-center text-neutral-400 mt-[20px]">
              Your cart is empty
            </p>
          )}
        </div>
        <p className="mt-[20px]">Komentar</p>
        <textarea
          className="w-full h-[100px] p-[10px] bg-neutral-800 text-neutral-300 rounded-lg mt-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="mt-[20px] pb-[50px] w-full flex justify-center">
        <Button
          variant="green"
          className=" w-[80%] md:max-w-[30%] "
          onClick={() => {
            handleOrder();
          }}
          disabled={state.articles.length === 0}
        >
          <p>
            <span className="bg-white  text-[var(--brand-green)] rounded-full px-[5px] py-[2px] mr-[10px]">
              {state.articles.length}
            </span>
            Potvrdi narudžbu {totalPrice} €{" "}
          </p>
        </Button>
      </div>
    </div>
  );
};

export default CartDialog;
