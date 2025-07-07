import { cn } from "@/utils/misc/cn/cn";
import React, { ButtonHTMLAttributes } from "react";

export const ButtonType: { [key in ButtonVariant]: string } = {
  gray: "bg-neutral-700 rounded-full border-[1px] border-neutral-300",
  darkGray: "bg-neutral-800 rounded-full border-[1px] border-neutral-500",
    green: "bg-[var(--brand-green)] text-white rounded-full text-[14px] px-[10px] py-[10px]  hover:bg-[var(--brand-green-light)]"
};

export type ButtonVariant = "gray" | "green" | "darkGray";

export const ButtonSize: { [key in ButtonSize]: string } = {
  small: "px-[8px] py-[7.5px]",
  medium: "",
  large: "",
};

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size = "medium",
  children,
  onClick,
  disabled,
  className,
  style,
}) => {
  return (
    <button
      className={cn(
        "leading-none transition-[background,border] disabled:opacity-50 cursor-pointer",
        ButtonType[variant],
        ButtonSize[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
