import { cn } from "@/utils/misc/cn/cn";

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
  const changeOption = (option: string) => {
    if (value === option && !disableToggle) {
      onChange(null);
    } else {
      onChange(option);
    }
  };

  return (
    <div
      className={cn(
        "relative flex w-fit rounded-xl  text-neutral-500",
        className
      )}
    >
      {options.map((option) => (
        <Option
          key={option.label}
          label={option.label}
          value={option.label}
          selected={value === option.label}
          onClick={() => changeOption(option.label)}
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
          "text-white bg-[var(--brand-green)]": selected,
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
