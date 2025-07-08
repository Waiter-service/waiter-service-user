import { cn } from "@/utils/misc/cn/cn";
import React, { FC } from "react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  classname?: string;
}

const QuantitySelector: FC<QuantitySelectorProps> = ({
  quantity = 1,
  onChange = () => {},
    classname = "",
}) => {
  const handleIncrease = () => {
    if (quantity < 5) {
      onChange(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      onChange(quantity - 1);
    }
  };

  return (
    <div className={cn("flex items-center text-neutral-600 bg-white rounded-full cursor-pointer", classname)}>
      <p className="px-[10px] text-[10px] py-[10px]" onClick={handleDecrease}>
        -
      </p>
      <p className="border-x-[1px] px-[15px] text-[14px] py-[10px] border-neutral-200">
        {quantity}
      </p>
      <p className="px-[10px] text-[10px] py-[10px]" onClick={handleIncrease}>
        +
      </p>
    </div>
  );
};

export default QuantitySelector;