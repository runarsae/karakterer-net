import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { ReactNode, useRef } from "react";

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}

interface AccordionGroupProps {
  children: ReactNode;
}

export function AccordionGroup({ children }: AccordionGroupProps) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

export function Accordion({
  title,
  children,
  active,
  onClick,
}: AccordionProps) {
  const accordionItemPanelRef = useRef<HTMLDivElement>(null);

  const scrollHeight = accordionItemPanelRef.current?.scrollHeight;

  return (
    <div className="overflow-hidden rounded">
      <button
        className={`card flex w-full items-center gap-2 rounded-none text-left`}
        onClick={onClick}
      >
        <div
          className={`transition-transform ${active && "[transform:rotate(90deg)]"}`}
        >
          <ArrowRightIcon width={16} height={16} />
        </div>
        <h3>{title}</h3>
      </button>
      <div
        ref={accordionItemPanelRef}
        className="overflow-hidden transition-max-h"
        style={{ maxHeight: active && scrollHeight ? scrollHeight : 0 }}
      >
        <div className="card rounded-none bg-neutral-900">{children}</div>
      </div>
    </div>
  );
}
