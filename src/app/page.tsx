"use client";

import { useEffect, useState } from "react";
import crypto from "crypto";
import { useBarData } from "@/queries/hooks/useGetBarData";

export default function Home() {
  const [decryptedData, setDecryptedData] = useState<{
    barId: number;
    tableId: number;
  } | null>(null);

  const secretKey =
    "5fbaef53eab424a62739b5935543a1522fddf462e00b59791aede33535886a5c";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encryptedData = urlParams.get("site");

    console.log(encryptedData);

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

  console.log(data);

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <p>
        bar {decryptedData?.barId} - table {decryptedData?.tableId}
      </p>
      <h1 className="text-2xl font-bold">Bar Data</h1>
      {data ? (
        <div>
          <h2>{data.name}</h2>
          <p>Location: {data.location}</p>
          <img src={data.image || ""} alt={data.name} />
          <ul>
            {data.articles.map((article, index) => (
              <li key={index}>
                <h3>{article.title}</h3>
                <p>{article.content}</p>
                <p>Price: ${article.price.toFixed(2)}</p>
                {article.image && <img src={article.image} alt={article.title} className="w-[200px]" />}
                <p>Status: {article.status}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
