import { LocationErrorPng } from "@/assets/images";
import Image from "next/image";

const ErrorPage = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="flex flex-col w-fit h-fit text-center max-w-[400px]">
        <Image
          src={LocationErrorPng}
          alt="Error Icon"
          className="mx-auto w-[200px] md:w-[300px]"
        />
        <h1 className="text-[20px] md:text-[28px] font-[700]">
          Ups! Ne nalazite se na lokaciji
        </h1>
        <p className="md:text-[24px]">
          Izgleda da se ne nalazite na mjestu s kojeg pokusavate naruciti.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
