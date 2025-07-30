import { SearchSvg } from "@/assets/icons";
import Image from "next/image";

import { cn } from "@/utils/misc/cn/cn";
import { FC, useState, useEffect, useRef } from "react";
import { useTable } from "@/providers/table-provider";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { setSearchArticle } = useTable();
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchArticle(searchInput);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput]);
  return (
    <div
      ref={searchBarRef}
      className="absolute top-0 right-0 md:relative flex flex-row-reverse md:flex-row items-center mx-[10px] bg-neutral-800 px-[5px] border-[1px] border-neutral-500 py-[4px] rounded-2xl group focus-within:bg-neutral-700 transition-all duration-300 ease-in-out"
      onClick={() => setIsSearchOpen(!isSearchOpen)}
    >
      <Image src={SearchSvg} alt="Search Icon" width={20} height={20} />
      <input
        type="text"
        placeholder="Pretraži"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className={cn(
          "text-neutral-300 md:w-fit md:opacity-100 md:ml-[7px] focus:outline-none focus:border-neutral-400 placeholder:text-neutral-300 transition-all duration-300 ease-in-out",
          isSearchOpen ? "w-[90vw] opacity-100" : "w-0 opacity-0"
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsSearchOpen(true);
        }}
      />
    </div>
  );
};

export default SearchBar;
