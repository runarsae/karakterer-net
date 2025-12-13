import { ButtonHTMLAttributes, forwardRef } from "react";

interface SelectableTextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

const SelectableTextButton = forwardRef<
  HTMLButtonElement,
  SelectableTextButtonProps
>(({ className = "", selected = false, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={`button-base ${
        selected
          ? "cursor-default font-medium text-neutral-300"
          : "text-neutral-500 hover:text-neutral-400"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

SelectableTextButton.displayName = "SelectableTextButton";

export default SelectableTextButton;
