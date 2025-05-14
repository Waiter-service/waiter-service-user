import { CocaColaPng } from "@/assets/images";
import Image from "next/image";
import { useEffect, useState } from "react";


interface HomePageProductDetail {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  description: string;
  price: number;
}

export default function HomePageProductDetail({isOpen, onClose, name, description, price}: HomePageProductDetail) {
    const [itemCartCount, setCount] = useState(1);

    const handleIncrement = () => {
        setCount(itemCartCount + 1);
    };
    const handleDecrement = () => {
        if (itemCartCount > 1) {
            setCount(itemCartCount - 1);
        }
    };
    
    useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
        setCount(1);
    }

    return () => {
    document.body.style.overflow = "auto";
    };
    }, [isOpen]);

    if (!isOpen) return null;

    return(
    <div className="fixed inset-0 flex items-center justify-center bg-black/90
    z-3 " >
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[35%] relative">

            {/*Close Button*/}
           <button
            className="absolute p-3 top-1 right-1 text-2xl text-gray-900 hover:text-gray-700 hover:bg-gray-200 rounded-full transition duration-200 ease-in-out cursor-pointer"
            onClick={onClose}
            >
            ✕
            </button>

            {/*Image*/}
            <Image
                src={CocaColaPng}
                alt="Coca Cola"
                className="max-w-[55%] h-auto rounded-lg justify-center mx-auto mb-4" 
            /> 

            <div className=" rounded-lg shadow-xl p-3">
                {/*Content*/}
                <div className="justify-center mx-auto space-y-2 p-2">
                    <h2 className="text-3xl font-bold text-black">{name}</h2>
                    <hr className="border-t-1 border-black" />
                    <p className="text-sm text-black">{description}</p>
                    <hr className="border-t-1 border-black" />
                    <p className="text-2x1 font-semibold text-black">${price.toFixed(2)}</p>
                </div>

                {/*Add Button*/}
                <div className="flex items-center justify-center mt-8 gap-6">
                    <div className="flex items-center justify-between  w-[40%]">
                        <button className=" bg-black p-3 text-white w-[25%] h-[20%] flex items-center justify-center rounded-[5.5] hover:bg-gray-800 transition duration-250 ease-in-out cursor-pointer text-xl disabled:text-gray-500 disabled:cursor-not-allowed" onClick={handleDecrement} disabled={itemCartCount <= 1}>
                        -
                        </button>
                        <p className="text-2xl font-semibold text-black mx-2">{itemCartCount}</p>
                        <button className=" bg-black p-3 text-white w-[25%] h-[20%] flex items-center justify-center rounded-[5.5] hover:bg-gray-800 transition duration-250 ease-in-out cursor-pointer text-xl" onClick={handleIncrement}>
                        +
                        </button>
                    </div>
                    <button className="bg-black p-3 text-white w-[50%] flex items-center rounded-[5.5] hover:bg-gray-800 transition duration-250 ease-in-out cursor-pointer text-xl ml-4" onClick={() => {
                        alert(`Added ${itemCartCount} ${name} to cart, the price will be ${(itemCartCount * price).toFixed(2)}!`);
                    }}>
                        <span className="flex-grow text-left">Add To Cart</span>
                        <span className="text-right">${(itemCartCount * price).toFixed(2)}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

