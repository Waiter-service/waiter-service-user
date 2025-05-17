import { CocaColaPng } from "@/assets/images";
import { on } from "events";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HomePageProductDetail {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  description: string;
  price: number;
}

export default function HomePageProductDetail({
  isOpen,
  onClose,
  name,
  description,
  price,
}: HomePageProductDetail) {
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cart.find((item: any) => item.name === name);

      if (existingItem) {
        setQuantity(existingItem.quantity);
        setIsInCart(true);
      } else {
        setQuantity(1);
        setIsInCart(false);
      }
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

    const updateLocalStorage = (newQuantity: number) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingIndex = cart.findIndex((item: any) => item.name === name);

        if (existingIndex !== -1) {
        cart[existingIndex].quantity = newQuantity;
        } else {
        cart.push({ name, price, quantity: newQuantity });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    };

   const handleIncrement = () => {
       setQuantity((prev) => prev + 1); 
     };

    const handleDecrement = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const newCart = cart.filter((item: any) => item.name !== name);
        const existingItem = cart.find((item: any) => item.name === name);
        if (quantity > 1) {
            setQuantity((prev) => prev - 1); 
        } 
        else if(existingItem) {
            const confirmRemove = confirm(`Remove "${name}" from your cart?`);
            if (confirmRemove) {
            localStorage.setItem("cart", JSON.stringify(newCart));
            window.dispatchEvent(new Event("cartUpdated"));
            setQuantity(1);
            onClose();
            }
        }
    };

    const handleAddToCart = () => {
        updateLocalStorage(quantity);
        window.dispatchEvent(new Event("cartUpdated"));
        alert(`Added ${quantity} ${name} to cart!`);
        onClose();
    };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-3">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[90%] relative md:max-w-[60%] lg:max-w-[45%]">
        {/* Close Button */}
        <button
          className="absolute p-3 top-1 right-1 text-2xl text-gray-900 hover:text-gray-700 hover:bg-gray-200 rounded-full transition duration-200 ease-in-out cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Image */}
        <Image
          src={CocaColaPng}
          alt="Coca Cola"
          className="max-w-[55%] h-auto rounded-lg justify-center mx-auto mb-4"
        />

        <div className="rounded-lg shadow-xl p-3">
          {/* Content */}
          <div className="justify-center mx-auto space-y-2 p-2">
            <h2 className="text-1xl font-bold text-black sm:text-[25px] xl:text-[30px]">{name}</h2>
            <hr className="border-t-1 border-black" />
            <p className="text-xs text-black sm:text-[15px] xl:text-[20px]">{description}</p>
            <hr className="border-t-1 border-black" />
            <p className="text-xs font-semibold text-black sm:text-[15px] xl:text-[20px]">${price.toFixed(2)}</p>
          </div>

          {/* Quantity & Add Button */}
          <div className="flex items-center justify-center mt-8 gap-3 flex-col sm:flex-row">
            <div className="flex items-center justify-between w-[80%]">
              <button
                className="bg-black p-3 text-white w-[25%] h-[10%] flex items-center justify-center rounded-[5.5] hover:bg-gray-800 transition duration-250 ease-in-out cursor-pointer text-xl disabled:text-gray-500 disabled:cursor-not-allowed text-xs  sm:text-base"
                onClick={handleDecrement}
                disabled={!isInCart && quantity === 1}
              >
                -
              </button>
              <p className="text-2xl font-semibold text-black mx-2">{quantity}</p>
              <button
                className="bg-black p-3 text-white w-[25%] flex items-center justify-center rounded-[5.5] hover:bg-gray-800 transition duration-250 ease-in-out cursor-pointer text-xs sm:text-base"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
            <button
              className="bg-black p-3 text-white w-[90%] flex items-center rounded-[5.5] hover:bg-gray-800 transition duration-250 ease-in-out cursor-pointer text-xl"
              onClick={handleAddToCart}
            >
              <span className="flex-grow text-left text-sm sm:text-base">Add To Cart</span>
              <span className="text-right text-sm sm:text-base">${(quantity * price).toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
