"use client";
import React from "react";

export type PreporuceniProizvod = {
  name: string;
  cijena: number;
  slika: string;
};

type Props = {
  proizvodi: PreporuceniProizvod[];
  onDodaj: (proizvod: PreporuceniProizvod) => void;
};

export default function PreporuceniProizvodi({ proizvodi, onDodaj }: Props) {
  return (
    <div className="mt-10">
      <h2 className="text-center text-white text-[1.8rem] font-semibold mb-6">
         Preporučeni proizvodi
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {proizvodi.map((p, i) => (
          <div
            key={i}
            className="flex items-center bg-[#2a2a2a] rounded-xl p-4"
          >
            <img
              src={p.slika}
              alt={p.name}
              className="w-20 h-20 object-cover rounded-md mr-4 bg-gray-700"
            />
            <div className="flex-1">
              <h3 className="text-white text-base font-semibold">{p.name}</h3>
              <p className="text-gray-400 text-sm mb-2">
                {p.cijena.toFixed(2)} €
              </p>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => onDodaj(p)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
