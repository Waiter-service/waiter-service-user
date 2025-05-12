import Image from "next/image";
import { cafeHomePagePng } from "@/assets/images";
import { coffeeBarSvg } from "@/assets/icons";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] text-white">
      <header className="relative w-full h-[350px] bg-cover bg-center" 
              style={{ backgroundImage: `url(${cafeHomePagePng.src})` }}>
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative h-full flex items-center">
          <div className="flex items-center gap-8 ml-5 pt-26">
            <div className="bg-white p-2 rounded shadow w-fit max-w-[25%]">
              <Image
                src={coffeeBarSvg}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-white">
              <h1 className="text-4xl font-bold">Ime Kafane</h1>
              <p className="text-lg mt-2">Yap Yap Yap Yap Yap!</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}