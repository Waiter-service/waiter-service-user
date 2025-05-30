"use client";
import Narudzba from "../components/drinks/narudzba";
import { Imenaproizvoda } from "../components/drinks/data";
import { useState } from "react";
import ConfirmModal from "../components/drinks/ConfirmModal";
import PreporuceniProizvodi, {
  PreporuceniProizvod,
} from "../components/drinks/PreporuceniProizvodi";

export default function Home() {
  const [narudzbe, setNarudzbe] = useState(
    Imenaproizvoda.map((p) => ({ ...p, amount: 1 }))
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [proizvodZaBrisanje, setProizvodZaBrisanje] = useState<number | null>(
    null
  );
  const [preporuceni, setPreporuceni] = useState<PreporuceniProizvod[]>([
    {
      name: "Sprite",
      cijena: 12,
      slika:
        "https://cjenik.co/storage/6569/conversions/sprite-025l-main_images.jpg",
    },
    {
      name: "Rakija",
      cijena: 18,
      slika:
        "https://www.shutterstock.com/image-photo/cognac-bottle-isolated-on-black-600nw-1905115192.jpg",
    },
  ]);
  const dodajPreporuceni = (novi: PreporuceniProizvod) => {
    const postoji = narudzbe.find((p) => p.name === novi.name);

    if (postoji) {
      const nove = narudzbe.map((p) =>
        p.name === novi.name ? { ...p, amount: p.amount + 1 } : p
      );
      setNarudzbe(nove);
    } else {
      setNarudzbe([...narudzbe, { ...novi, amount: 1 }]);
    }
    setPreporuceni((prethodni) =>
      prethodni.filter((p) => p.name !== novi.name)
    );
  };

  const povecaj = (index: number) => {
    const nove = narudzbe.map((p, i) =>
      i === index ? { ...p, amount: p.amount + 1 } : p
    );
    setNarudzbe(nove);
  };

  const smanji = (index: number) => {
    const proizvod = narudzbe[index];
    if (proizvod.amount === 1) {
      setProizvodZaBrisanje(index);
      setModalOpen(true);
      return;
    }
    const nove = narudzbe.map((p, i) =>
      i === index ? { ...p, amount: p.amount - 1 } : p
    );
    setNarudzbe(nove);
  };

  const ukupno = narudzbe.reduce((suma, p) => suma + p.cijena * p.amount, 0);

  return (
    <div className="pt-8 pb-16 max-w-[1440px] mx-auto">
      <div className=" px-4">
        <h1 className="text-center text-white text-[1.8rem] font-semibold mb-6">
          Vaša narudžba
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
          {narudzbe.map((proizvod, i) => (
            <Narudzba
              key={i}
              ime={proizvod.name}
              price={proizvod.cijena}
              slika={proizvod.slika}
              amount={proizvod.amount}
              onPovecaj={() => povecaj(i)}
              onSmanji={() => smanji(i)}
            />
          ))}
        </div>
        <PreporuceniProizvodi
          proizvodi={preporuceni}
          onDodaj={dodajPreporuceni}
        />

        <div className="text-white text-xl font-semibold text-center mt-6">
          Ukupno: {ukupno.toFixed(2)} €
        </div>
      </div>
      <div className="relative w-full z-[999] bg-blue-600 mt-5">
        <button
          className="w-full py-4 bg-transparent text-white border-none text-lg font-semibold cursor-pointer rounded-none"
          onClick={() => alert("Narudžba potvrđena!")}
        >
          Potvrdi narudžbu
        </button>
      </div>
      {modalOpen && proizvodZaBrisanje !== null && (
        <ConfirmModal
          ime={narudzbe[proizvodZaBrisanje].name}
          onCancel={() => setModalOpen(false)}
          onConfirm={() => {
            const nove = narudzbe.filter((_, i) => i !== proizvodZaBrisanje);
            setNarudzbe(nove);
            setModalOpen(false);
            setProizvodZaBrisanje(null);
          }}
        />
      )}
    </div>
  );
}
