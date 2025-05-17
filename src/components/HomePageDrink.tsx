import Image from "next/image";
import { CocaColaPng } from "@/assets/images";
import { useState } from "react";
import HomePageProductDetail from "@/components/HomePageProductDetail";

interface HomePageDrinkProps {
  name: string;
  description: string;
  price: number;
}

export default function HomePageDrink({ name, description, price }: HomePageDrinkProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <>
        <div className="relative bg-white shadow-lg rounded-xl px-8 py-6 flex items-center justify-between max-w-[80%] mx-auto hover:shadow-2xl hover:scale-[1.02] transition-all duration-250 ease-in-out cursor-pointer overflow-hidden
        sm:max-w-[65%] md:max-w-[90%]"  onClick={() => setIsModalOpen(true)}>
            {/* Button */}
            <button 
                className="absolute top-0 right-0 bg-black text-white w-[15%] h-[20%] flex items-center justify-center rounded-[5.5] hover:bg-gray-800 transition duration-250 ease-in-out cursor-pointer text-xl z-2"
                onClick={(e) => {
                e.stopPropagation(); 
                alert("Added to cart!"); 
            }}
            >
                +
            </button>
            
            {/* Content */}
            <div className="pr-4 max-w-[45%]  flex flex-col gap-2"> 
                <h2 className="text-1xl font-bold text-black max-w-[30%] sm:text-[25px]">{name}</h2>
                <p className="text-xs text-black sm:text-[15px]">{description}</p>
                <p className="text-xs font-semibold text-black sm:text-[15px]">${price.toFixed(2)}</p>
            </div>
            
            {/* Image */}
            <Image
                src={CocaColaPng}
                alt="Coca Cola"
                className="max-w-[48%] h-auto rounded-lg md:translate-x-[15%]"
            />
        </div>

        {/* Modal */}
        <HomePageProductDetail 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        name={name} 
        description={description} 
        price={price}/> 
    </>
    );
}