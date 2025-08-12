import { ArrowLeftSvg } from "@/assets/icons";
import Button from "@/components/button/Button";
import { useDialogContext } from "@/providers/dialog/DialogProvider";
import Image from "next/image";
import { FC } from "react";
import { z } from "zod";

export const aboutDialogDataSchema = z.object({
  name: z.string(),
  logo: z.string(),
  location: z.string(),
  openingTime: z.string(),
  closingTime: z.string(),
  description: z.string(),
});

export interface AboutDialogDataSchema
  extends z.infer<typeof aboutDialogDataSchema> {}

interface AboutDialogProps {
  data: AboutDialogDataSchema;
}

const AboutDialog: FC<AboutDialogProps> = ({ data }) => {
  const { close } = useDialogContext();

  const openingHours = data.openingTime.split(",");
  const closingHours = data.closingTime.split(",");
  const days = [
    "Ponedjeljak",
    "Utorak",
    "Srijeda",
    "Četvrtak",
    "Petak",
    "Subota",
    "Nedjelja",
  ];

  return (
    <div className=" w-full h-full bg-neutral-900 md:p-[20px]">
      <div className="relative w-full h-full max-w-[1440px] overflow-y-scroll hide-scrollbar ml-auto mr-auto flex flex-col items-center pb-[100px]">
        <div className="flex items-center justify-between p-[20px] w-full">
          <Button
            variant="darkGray"
            className="p-[7px] flex gap-[5px]"
            onClick={close}
          >
            <Image src={ArrowLeftSvg} alt="Close Icon" width={16} height={16} />
            <p className="hidden md:block">Vrati se na meni</p>
          </Button>
          <p className="text-[24px]">Podaci o trgovini</p>
        </div>
        <Image
          src={data.logo || "/default-logo.png"}
          alt="Bar Logo"
          width={200}
          height={200}
          className="w-[200px] h-[200px] mt-[30px] border-[3px] rounded-full object-cover"
        />
        <p className="text-[32px] mt-[20px]">{data.name}</p>
        <div className="w-full max-w-[600px]mt-[30px] py-[20px] text-center">
          <p className="text-[22px] font-bold">Adresa</p>
          <p className="text-[20px]">{data.location}</p>
        </div>
        <div className="w-full max-w-[600px] py-[20px] text-center">
          <p className="text-[22px] font-bold">Radno Vrijeme</p>
          <div className="text-[20px] flex flex-col mt-[20px]">
            {
              days.map((day, index) => (
                <span key={index}>
                  {day}: {openingHours[index]} - {closingHours[index]}
                </span>
              ))
            }
          </div>
        </div>
        <p className="text-[22px] font-bold mt-[30px]">
          Informacije o partneru
        </p>
        <div className="my-[20px]">
          {data.description.split("/").map((line, index) => (
            <p key={index} className="text-center text-[20px]">
              {line.trim()}
              {index < data.description.split("/").length - 1}
            </p>
          )) || "Nema dodatnih informacija."}
        </div>
      </div>
    </div>
  );
};

export default AboutDialog;
