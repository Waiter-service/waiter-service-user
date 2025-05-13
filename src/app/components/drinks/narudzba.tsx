"use client";
import React, { useState } from "react";

type NarudzbaProps = {
  ime: string;
  price: number;
  slika: string;
};

export default function Narudzba({ ime, price, slika }: NarudzbaProps) {
  const [kolicina, setKolicina] = useState(1);

  const povecaj = () => setKolicina(kolicina + 1);
  const smanji = () => setKolicina(Math.max(kolicina - 1, 0));
  
    let cijena=price*kolicina;
  return (
    <div
  style={{
    display: "flex",
    alignItems: "center",
    borderRadius: "14px",
    backgroundColor: "#1e1e1e", // TAMNA KARTICA
    padding: "14px",
    margin: "12px 16px",
  }}
>
  <img
    src={slika}
    alt={ime}
    style={{
      width: "80px",
      height: "80px",
      objectFit: "cover",
      borderRadius: "10px",
      marginRight: "16px",
      backgroundColor: "#333", // fallback ako slika ne učita
    }}
  />
  <div style={{ flex: 1 }}>
    <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#f5f5f5" }}>{ime}</h3>
    <p style={{ margin: "6px 0", color: "#bbbbbb" }}>{cijena.toFixed(2)} €</p>
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px" }}>
      <button
        onClick={smanji}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "none",
          background: "#333",
          fontSize: "1.2rem",
          cursor: "pointer",
          color: "#fff",
        }}
      >
        −
      </button>
      <span style={{ minWidth: "20px", textAlign: "center", fontWeight: 600 }}>{kolicina}</span>
      <button
        onClick={povecaj}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "none",
          background: "#007aff",
          color: "white",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
      >
        +
      </button>
    </div>
  </div>
</div>
  );
};
