"use client";

import { useEffect, useState } from "react";
import crypto from "crypto";
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

export default function Home() {
  const orders = useOrders(1);

  console.log(orders);

  const { state } = useCart();
  const { open } = useDialogContext();
  const [decryptedData, setDecryptedData] = useState<{
    barId: number;
    tableId: number;
  } | null>(null);

  const secretKey =
    "5fbaef53eab424a62739b5935543a1522fddf462e00b59791aede33535886a5c";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encryptedData = urlParams.get("site");

    if (encryptedData) {
      const data = decryptData(encryptedData);
      console.log("Decrypted Data:", data.barId, data.tableId);
      setDecryptedData(data);
    }
  }, []);

  function decryptData(encryptedData: string): {
    barId: number;
    tableId: number;
  } {
    const [ivHex, encryptedHex] = encryptedData.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(secretKey, "hex"),
      iv
    );
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return JSON.parse(decrypted.toString("utf8"));
  }

  if (decryptedData) {
    console.log("Decrypted Data:", decryptedData.barId, decryptedData.tableId);
  }

  const { data } = useBarData(decryptedData?.barId || 1);

  const groupedArticles = data?.articles.reduce(
    (acc: Record<string, typeof data.articles>, article) => {
      const category = article.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(article);
      return acc;
    },
    {}
  );
  const categories = Object.keys(groupedArticles || {}).map((category) => ({
    label: category,
    value: category.toLowerCase().replace(/\s+/g, "-"),
  }));

  return (
    <div className="">
      <Header bar={data} categories={categories} />
      <div className="px-[10px]">
        {Object.entries(groupedArticles || {}).map(([category, articles]) => (
          <div key={category} className="mb-[30px]">
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
      {state.articles.length > 0 && (
        <Button
          variant="green"
          className=" w-[90%] fixed bottom-[10px] left-[5%]"
          onClick={() => open("cart")}
        >
          Go to Cart
        </Button>
      )}
      {orders.length > 0 && (
        <div
          className={cn(
            "border-[2px] rounded-full w-fit fixed bottom-[10px] right-[10px]",
            orders[0].status === "PENDING" &&
              "border-[var(--brand-green-light)]",
            orders[0].status === "COMPLETED" && "border-[var(--brand-green)]"
          )}
        >
          <Image
            src={CartSvg}
            alt="Cart Icon"
            width={36}
            height={36}
            className=" cursor-pointer bg-[var(--brand-green)] rounded-full p-[8px] border-[1px] border-black"
          />
        </div>
      )}
    </div>
  );
}
