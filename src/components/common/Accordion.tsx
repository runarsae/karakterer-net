"use client";

import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { motion, AnimatePresence } from "motion/react";
import { ReactNode } from "react";

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
  return (
    <div className="overflow-hidden rounded-sm">
      <button
        className="card flex w-full cursor-pointer items-center gap-2 rounded-none text-left"
        onClick={onClick}
      >
        <motion.div
          animate={{ rotate: active ? 90 : 0 }}
          transition={{ duration: 0.15 }}
        >
          <ArrowRightIcon width={16} height={16} />
        </motion.div>
        <h3>{title}</h3>
      </button>
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="card rounded-none bg-neutral-900">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
