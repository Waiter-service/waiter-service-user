import { useEffect, useState } from "react";

const orderOptions = ["Most Popular", "Hot Drink", "Cold Drink", "Alcoholic"];

export default function HomePageNavBar({ currentSection }: { currentSection: string }) {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
  const checkCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setShowButton(cart.length > 0);
  };
  checkCart();
  window.addEventListener("cartUpdated", checkCart);

  return () => {
    window.removeEventListener("cartUpdated", checkCart);
  };
}, []);


  return (
    <div className="sticky top-0 z-2">
      <nav className="bg-black/90 backdrop-blur-sm py-3 border-b border-gray-700">
        <div className="flex justify-between items-center mx-auto max-w-7xl px-4">
          
          {/* NavBar buttons */}
          <div className="flex justify-center items-center gap-4 md:gap-10 flex-1">
            {orderOptions.map((option, index) => {
              const sectionId = option.replace(/\s+/g, '-').toLowerCase();
              const isActive = currentSection === sectionId;

              return (
                <a
                  key={index}
                  href={`#${sectionId}`}
                  className={`text-sm md:text-lg font-medium px-3 py-1 md:px-4 md:py-2 rounded transition duration-300
                    ${isActive ? "bg-white/30 text-white font-semibold" : "text-white hover:bg-white/20"}
                  `}
                >
                  {option}
                </a>
              );
            })}
          </div>

          {/* Naruci button */}
          {showButton && (
          <button
            className="text-sm md:text-lg font-medium px-3 py-1 md:px-4 md:py-2 rounded transition duration-300 text-white hover:bg-white/20 cursor-pointer "
            onClick={()=> {
              const cart = JSON.parse(localStorage.getItem("cart") || "[]");
              if (cart.length > 0) {
                alert("Your items" + cart.map((item: any) => `\n${item.name} (${item.quantity})`).join("") + "\n\nThank you for your order!");
              } 
            }}
          >
            Naruci
          </button>
        )}

        </div>
      </nav>
    </div>

  );
}
