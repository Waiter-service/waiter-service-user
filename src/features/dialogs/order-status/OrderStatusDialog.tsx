import { ArrowLeftSvg, CartSvg } from "@/assets/icons";
import Button from "@/components/button/Button";
import useOrders from "@/hooks/useOrder";
import { useDialogContext } from "@/providers/dialog/DialogProvider";
import { useBarData } from "@/queries/hooks/useGetBarData";
import { cn } from "@/utils/misc/cn/cn";
import Image from "next/image";

const OrderStatusDialog = () => {
  const orders = useOrders(1);
  console.log(orders);
  const { data: barData } = useBarData(1);
  const { close } = useDialogContext();

  const orderArticlesMetadata = barData?.articles
    .filter((article) =>
      orders?.some((orderItem) =>
        orderItem.OrderArticle.some((item) => item.articleId === article.id)
      )
    )
    .map((article) => {
      const totalQuantity = orders
        ?.flatMap((orderItem) => orderItem.OrderArticle)
        .filter((item) => item.articleId === article.id)
        .reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...article,
        quantity: totalQuantity || 1,
      };
    });

  const totalPrice = orders.reduce((total, order) => {
    return total + order.total;
  }, 0);

  return (
    <div className="w-full h-full bg-neutral-900">
      <div className="max-w-[1440px] ml-auto mr-auto">
        <Button
          variant="darkGray"
          className="p-[7px] flex gap-[5px] m-[20px]"
          onClick={close}
        >
          <Image src={ArrowLeftSvg} alt="Close Icon" width={16} height={16} />
          <p className="hidden md:block">Vrati se na meni</p>
        </Button>
        <div className="w-full flex flex-col items-center">
          <div
            className={cn(
              "rounded-full border-[3px]   bg-[var(--brand-green)]",
              orders[orders.length - 1]?.status === "PENDING" &&
                "border-[var(--brand-green-light)]",
              orders[orders.length - 1]?.status === "COMPLETED" &&
                "border-[var(--brand-green)]"
            )}
          >
            <div className="p-[10px] border-[1px] rounded-full w-fit h-fit border-black">
              <Image
                src={CartSvg}
                alt="Cart Icon"
                width={45}
                height={45}
                className="border-[1px]"
              />
            </div>
          </div>
          <p className="mt-[15px] text-[20px]">
            {orders[orders.length - 1]?.status === "PENDING"
              ? "Narudzba je u obradi"
              : "Narudzba je zavrsena"}
          </p>
          <p className="text-[14px]">
            Ukupno za platiti{" "}
            <span className="text-[var(--brand-green-light)]">
              {totalPrice.toFixed(2)} €
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-[20px] mt-[40px] gap-[20px]">
          {orderArticlesMetadata?.map((article) => (
            <div
              key={article.id}
              className="md:bg-neutral-800 md:border-[1px] border-neutral-700 p-[10px] rounded-xl relative"
            >
              <p className="text-[18px] font-bold">{article.title}</p>
              <p className="text-[14px] text-neutral-400">{article.content}</p>
              <p className="text-[var(--brand-green-light)] mt-[20px]">
                {article.price.toFixed(2)}€ x {article.quantity}
              </p>
              <div className="absolute flex justify-center items-center top-[7px] right-[7px] bg-[var(--brand-green)] text-white rounded-bl-2xl rounded-tr-xl p-[5px] w-[39px] h-[39px] text-center">
                {article.quantity}
              </div>
            </div>
          ))}
        </div>
        <div className=" bg-neutral-800 min-h-[100px] m-[20px] p-[20px] rounded-2xl">
          {orders ? (
            <>
              <p className="">Komentari:</p>
              {orders.map((order) =>
                order.comment ? (
                  <p
                    className="text-neutral-300 mt-[20px] border-t-[1px] border-neutral-600 pt-[5px]"
                    key={order.id}
                  >
                    {order.comment}
                  </p>
                ) : null
              )}
            </>
          ) : (
            <p className="text-neutral-400 p-[20px]">
              Nema dodatnih komentara.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusDialog;
