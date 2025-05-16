import { useEffect, useState, useRef } from "react";

const orderOptions = ["Most Popular", "Hot Drink", "Cold Drink", "Alcoholic"];

export default function HomePageNavBar({ currentSection }: { currentSection: string }) {
  const [showButton, setShowButton] = useState(false);

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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

  useEffect(() => {
    const index = orderOptions.findIndex(
      (option) => option.replace(/\s+/g, "-").toLowerCase() === currentSection
    );
    const activeLink = linkRefs.current[index];
    if (activeLink) {
      activeLink.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [currentSection]);

  return (
    <div className="sticky top-0 z-2">
      <nav className="bg-black/90 backdrop-blur-sm py-3 border-b border-gray-700">
        <div className="flex justify-between items-center mx-auto max-w-7xl px-4">

          {/* Scrollable NavBar buttons */}
          <div className="flex-1 overflow-x-auto scrollbar-none">
            <div className="flex justify-start items-center gap-4 md:gap-10 min-w-max">
              {orderOptions.map((option, index) => {
                const sectionId = option.replace(/\s+/g, "-").toLowerCase();
                const isActive = currentSection === sectionId;

                return (
                  <a
                    key={index}
                    href={`#${sectionId}`}
                    ref={(el) => { linkRefs.current[index] = el; }}
                    className={`text-sm md:text-lg font-medium px-3 py-1 md:px-4 md:py-2 rounded transition duration-300
                      ${isActive ? "bg-white/30 text-white font-semibold" : "text-white hover:bg-white/20"}
                    `}
                  >
                    {option}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Naruci Button */}
          {showButton && (
            <button
              className="ml-4 text-sm md:text-lg font-medium px-3 py-1 md:px-4 md:py-2 rounded transition duration-300 text-white hover:bg-white/20 cursor-pointer"
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                if (cart.length > 0) {
                  alert(
                    "Your items" +
                      cart.map((item: any) => `\n${item.name} (${item.quantity})`).join("") +
                      "\n\nThank you for your order!"
                  );
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
