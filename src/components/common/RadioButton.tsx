import { ChangeEventHandler } from "react";

interface RadioButtonProps {
  group: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export default function RadioButton({
  group,
  label,
  value,
  checked,
  onChange,
  disabled,
}: RadioButtonProps) {
  return (
    <>
      <input
        type="radio"
        className="fixed w-0 appearance-none opacity-0"
        disabled={disabled}
        id={label}
        name={group}
        value={value}
        onChange={onChange}
        checked={checked}
        onKeyDown={(e) => {
          if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
            e.preventDefault();
          }
        }}
      />
      {/* prettier-ignore */}
      <label
        htmlFor={label}
        className={`
          relative
          flex
          items-center
          gap-3
          ${disabled ? "opacity-40" : "cursor-pointer"}
          
          before:relative
          before:h-[20px]
          before:w-[20px]
          before:rounded-full
          before:border-2
          before:border-solid
          ${checked ? "before:border-sky-600" : "before:border-neutral-400"}

          after:absolute
          after:left-[5px]
          after:w-[10px]
          after:h-[10px]
          after:rounded-full
          after:bg-sky-600
          after:transition-all
          ${checked ? "after:opacity-100 after:scale-100" : "after:opacity-0 after:scale-0"}
        `}
      >
        {label}
      </label>
    </>
  );
}
