import { forwardRef } from "react";

interface ExtremeTickLabelProps {
  align: "left" | "right";
  visible: boolean;
  label?: string;
}

type Ref = HTMLDivElement;

const ExtremeTickLabel = forwardRef<Ref, ExtremeTickLabelProps>(
  function ExtremeTickLabel({ align, visible, label }, ref) {
    return (
      <div
        ref={ref}
        className={`${visible ? "visible" : "invisible"} absolute ${align === "left" ? "left-0" : "right-0"} top-0 h-[30px] w-[64px] select-none rounded-sm bg-neutral-950 p-[5px_8px] text-center text-sm text-neutral-700`}
      >
        {label}
      </div>
    );
  },
);

export default ExtremeTickLabel;
