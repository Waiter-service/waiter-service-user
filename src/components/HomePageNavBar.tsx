const orderOptions = ["Most Popular", "Hot Drink", "Cold Drink", "Alcoholic"];

export default function HomePageNavBar({ currentSection }: { currentSection: string }) {
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
          <button
            className="text-sm md:text-lg font-medium px-3 py-1 md:px-4 md:py-2 rounded transition duration-300 text-white hover:bg-white/20 cursor-pointer "
          >
            Naruci
          </button>

        </div>
      </nav>
    </div>

  );
}
