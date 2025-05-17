"use client";
import React, { useState } from "react";

type NarudzbaProps = {
  ime: string;
  price: number;
  slika: string;
};

export default function Narudzba({ ime, price, slika}: NarudzbaProps) {
  const [kolicina, setKolicina] = useState(1);

  const povecaj = () => setKolicina(kolicina + 1);
  const smanji = () => setKolicina(Math.max(kolicina - 1, 0));

  const cijena = price * kolicina;

  return (
    <div className="flex items-center bg-[#1e1e1e] rounded-[14px] px-4 py-3 mx-4 my-3">
      <img
        src={slika}
        alt={ime}
        className="w-20 h-20 object-cover rounded-[10px] mr-4 bg-[#333]"
      />
      <div className="flex-1">
        <h3 className="text-[1.1rem] text-[#f5f5f5] font-medium m-0">{ime}</h3>
        <p className="text-[#bbbbbb] text-sm my-1">{cijena.toFixed(2)} €</p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={smanji}
            className="w-8 h-8 bg-[#333] text-white rounded-full text-lg font-semibold"
          >
            −
          </button>
          <span className="min-w-[20px] text-center font-semibold text-white">{kolicina}</span>
          <button
            onClick={povecaj}
            className="w-8 h-8 bg-[#007aff] text-white rounded-full text-lg font-semibold"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
