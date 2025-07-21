"use client";

import { useEffect } from "react";
import { useBarData } from "@/queries/hooks/useGetBarData";
import Header from "@/features/pages/home/header";
import Article from "@/features/pages/home/article";
import { useCart } from "@/providers/cart-provider";
import Button from "@/components/button/Button";
import { useDialogContext } from "@/providers/dialog/DialogProvider";
import useOrders from "@/hooks/useOrder";
import Image from "next/image";
import { CartSvg } from "@/assets/icons";
import { cn } from "@/utils/misc/cn/cn";
import { decryptData } from "@/utils/misc/crypto";
import { useTable } from "@/providers/table-provider";
import ErrorPage from "@/features/pages/error/page";

export default function Home() {
  const { state } = useCart();
  const { open } = useDialogContext();
  const { setTableData, tableData, selectedCategoryData, searchArticleData } =
    useTable();
  const orders = useOrders(tableData?.tableId || 0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encryptedData = urlParams.get("site");

    if (encryptedData) {
      try {
        const data = decryptData(encryptedData);
        setTableData(data);
      } catch (error) {
        console.error("Failed to decrypt data:", error);
      }
    }
  }, []);

  const { data } = useBarData(tableData?.barId || 0);

  const groupedArticles = data?.articles.reduce(
    (acc: Record<string, typeof data.articles>, article) => {
      const category = article.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(article);
      return acc;
    },
    {}
  );

  const filteredArticles =
    searchArticleData.length > 2 &&
    data?.articles.filter((article) => {
      if (searchArticleData) {
        return article.title
          .toLowerCase()
          .includes(searchArticleData.toLowerCase());
      }
      return true;
    });

  const categories = Object.keys(groupedArticles || {}).map((category) => ({
    label: category,
    value: category.toLowerCase().replace(/\s+/g, "-"),
  }));

  return tableData ? (
    <div className="">
      <Header bar={data} categories={categories} />
      <div className={cn("px-[10px]", filteredArticles && "hidden")}>
        {Object.entries(groupedArticles || {}).map(([category, articles]) => (
          <div
            key={category}
            className={cn(
              "mb-[30px]",
              selectedCategoryData !== null &&
                selectedCategoryData !== "" &&
                selectedCategoryData !== category.toLocaleLowerCase() &&
                "hidden"
            )}
          >
            <h2 className="text-xl font-bold mb-[10px] mt-[20px]">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-[20px]">
              {articles.map((article) => (
                <Article article={article} key={article.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {filteredArticles && (
        <div className=" relative grid grid-cols-1 md:grid-cols-2 w-full gap-[20px] px-[10px] mt-[20px]">
          {filteredArticles.map((article) => (
            <Article article={article} key={article.id} />
          ))}
          {filteredArticles.length === 0 && (
            <p className="text-center text-neutral-200 mt-[32px] absolute top-0 w-full">
              Nema rezultata za "{searchArticleData}"
            </p>
          )}
        </div>
      )}
      {state.articles.length > 0 && (
        <Button
          variant="green"
          className=" w-[75%] fixed bottom-[10px] left-[12.5%]"
          onClick={() => open("cart")}
        >
          {orders.length > 0 ? "Nadodaj u narudzbu" : "Naruci"}
        </Button>
      )}
      {orders.length > 0 && (
        <div
          className={cn(
            "border-[2px] rounded-full w-fit fixed bottom-[10px] right-[10px]",
            orders.length > 0 &&
              orders[orders.length - 1].status === "PENDING" &&
              "border-[var(--brand-green-light)]",
            orders.length > 0 &&
              orders[orders.length - 1].status === "COMPLETED" &&
              "border-[var(--brand-green)]"
          )}
        >
          <Image
            src={CartSvg}
            alt="Cart Icon"
            width={36}
            height={36}
            className=" cursor-pointer bg-[var(--brand-green)] rounded-full p-[8px] border-[1px] border-black"
            onClick={() => open("order-status")}
          />
        </div>
      )}
    </div>
  ) : (
    <ErrorPage />
  );
}
