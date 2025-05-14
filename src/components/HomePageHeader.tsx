import Image from "next/image";
import { cafeHomePagePng } from "@/assets/images";
import { coffeeBarSvg } from "@/assets/icons";

export default function HomePageHeader() {
  return (
    <header className="relative w-full">
      
      <div className="relative w-full h-[320px] bg-cover bg-center" 
           style={{ backgroundImage: `url(${cafeHomePagePng.src})` }}>
        <div className="absolute inset-0 bg-black/30"></div>
       
        {/*Logo and Title*/}
        <div className="relative h-full flex items-center">
          <div className="flex items-center gap-8 ml-5 pt-26">
            <div className="bg-white p-2 rounded-[8] shadow w-fit max-w-[25%]">
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
      </div>
    </header>
  );
}