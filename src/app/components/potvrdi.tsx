export default function Potvrdinarudzbu() {
  return (
    <div className="relative w-full z-[999] bg-blue-600 mt-5">
      <button
        className="w-full py-4 bg-transparent text-white border-none text-lg font-semibold cursor-pointer rounded-none"
        onClick={() => alert("Narudžba potvrđena!")}
      >
        Potvrdi narudžbu
      </button>
    </div>
  );
}
