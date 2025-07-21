import { FC, useState } from "react";
import Image from "next/image";
import {
  GlobeSvg,
  DotVerticalFilledSvg,
  ClockSvg,
  HouseSvg,
} from "@/assets/icons";
import Button from "@/components/button/Button";
import ButtonGroup from "@/components/button-group";
import SearchBar from "@/components/search-bar";
import { useTable } from "@/providers/table-provider";
import Link from "next/link";
import { useDialogContext } from "@/providers/dialog/DialogProvider";

interface HeaderProps {
  bar?: {
    name: string | null;
    logo?: string | null;
    image?: string | null;
    location?: string | null;
    openingTime?: string | null;
    closingTime?: string | null;
    description?: string | null;
  };
  categories?: {
    label: string;
    value: string;
  }[];
}

const Header: FC<HeaderProps> = ({
  bar: {
    name: barName = "Bar Name",
    logo: barLogo = "/default-logo.png",
    image: barBackgroundImage = "/default-logo.png",
    description,
    location = "Unknown Location",
    openingTime = "09:00",
    closingTime = "23:00",
  } = {},
  categories = [
    { label: "All", value: "all" },
    { label: "Drinks", value: "drinks" },
    { label: "Food", value: "food" },
    { label: "Desserts", value: "desserts" },
  ],
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories?.[0]?.value || "all"
  );
  const { setSelectedCategoryData } = useTable();
  const { open } = useDialogContext();

  const handleCategoryChange = (option: string) => {
    setSelectedCategory(option);
    setSelectedCategoryData(option);
  };

  return (
    <div>
      <div className="relative">
        <Image
          src={barBackgroundImage || "/default-logo.png"}
          alt="Bar Logo"
          width={2000}
          height={2000}
          className="w-full h-[170px] md:h-[270px] object-cover"
        />
        <div className="w-full absolute flex flex-col items-center justify-between md:block h-full top-0 left-0 px-[20px]">
          <div className="flex justify-end items-center mt-[16px] w-full">
            <Button variant="gray" className="p-[4px] hidden">
              <Image src={GlobeSvg} alt="Globe Icon" width={20} height={20} />
            </Button>
            <Button variant="gray" className="p-[4px]" onClick={() => open('about', { name: barName, logo: barLogo, description, location, openingTime, closingTime })}>
              <Image
                src={DotVerticalFilledSvg}
                alt="Globe Icon"
                width={20}
                height={20}
              />
            </Button>
          </div>
          <div className="flex flex-col md:block  translate-y-[30px] items-center">
            <div className="bg-black h-[110px] w-[110px]  md:w-[212px] md:h-[212px] rounded-full border-[2px] border-neutral-300">
              <Image
                src={barLogo || "/default-logo.png"}
                alt="Logo"
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="text-[32px] md:hidden">{barName}</p>
            <div className="flex items-center gap-[10px] md:hidden">
              <Image
                src={ClockSvg}
                alt="Globe Icon"
                width={30}
                height={30}
                className="bg-neutral-800 rounded-full border-[1px] border-neutral-300 p-[4px]"
              />
              {openingTime && closingTime && (
                <p className="text-neutral-300">
                  {openingTime} - {closingTime}
                </p>
              )}
              <Image
                src={HouseSvg}
                alt="Globe Icon"
                width={30}
                height={30}
                className="bg-neutral-800 rounded-full border-[1px] border-neutral-300 p-[4px]"
              />
              <p className="text-neutral-300">{location}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-between mt-[120px] md:mt-[40px]">
        <ButtonGroup
          options={categories}
          value={selectedCategory}
          onChange={(option) => handleCategoryChange(option || "")}
          className="w-[80%] md:w-auto overflow-scroll hide-scrollbar"
        />
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
