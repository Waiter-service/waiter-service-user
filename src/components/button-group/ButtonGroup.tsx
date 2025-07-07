import { cn } from "@/utils/misc/cn/cn";
import React, { useEffect, useRef, useState } from "react";

export interface Option {
  value: string;
  label: string;
}

export interface ButtonsGroupProps {
  options: Option[];
  value: string | null;
  onChange: (option: string | null) => void;
  className?: string;
  disableToggle?: boolean;
}

const ButtonGroup: React.FC<ButtonsGroupProps> = ({
  options,
  value,
  onChange,
  className,
  disableToggle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const changeOption = (option: string) => {
    if (value === option && !disableToggle) {
      onChange(null);
    } else {
      onChange(option);
    }
  };

  const [backgroundStyle, setBackgroundStyle] = useState({
    width: "0px",
    height: "0px",
    transform: "translateX(0px)",
  });
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const buttons = container.querySelectorAll("button");
      buttons.forEach((button) => {
        if (button.getAttribute("data-category") === value) {
          const rect = button.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          setBackgroundStyle({
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            transform: `translate(${rect.left - containerRect.left}px`,
          });
        }
      });
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex w-fit rounded-xl  text-neutral-500",
        className
      )}
    >
      <div
        className={cn(
          "absolute top-[3px] rounded-lg bg-[var(--brand-green)] transition-all duration-300",
          {
            "opacity-0": !value,
          }
        )}
        style={backgroundStyle}
      />

      {options.map((option) => (
        <Option
          key={option.label}
          label={option.label}
          value={option.value}
          selected={value === option.value}
          onClick={() => changeOption(option.value)}
        />
      ))}
    </div>
  );
};

interface OptionProps extends React.HTMLAttributes<HTMLButtonElement> {
  selected: boolean;
  label: string;
  value: string;
  icon?: React.ReactElement;
}

const Option: React.FC<OptionProps> = ({
  selected,
  value,
  label,
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      data-category={value}
      className={cn(
        "relative m-[3px] flex cursor-pointer flex-grow items-center justify-center gap-[5px] whitespace-nowrap rounded-xl px-[8px] py-[3px] text-[14px] transition-all duration-300 sm:px-[12px] sm:py-[5px]",
        {
          "text-white": selected,
        },
        className
      )}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

export default ButtonGroup;
