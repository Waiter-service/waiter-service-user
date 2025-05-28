"use client";
export default function NarudzbaLoading() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex flex-col items-center justify-center">
      <div className="w-28 h-28 rounded-full bg-yellow-400 animate-ping-slow shadow-lg shadow-yellow-400/40 mb-6"></div>
      <p className="text-white text-xl font-semibold tracking-wide">Vaša narudžba se priprema…</p>
    </div>
  );
}
