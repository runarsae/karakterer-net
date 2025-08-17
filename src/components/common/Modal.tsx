"use client";

import { ReactNode, useEffect } from "react";
import Overlay from "./Overlay";
import { disableScroll, enableScroll } from "@/utils/scroll";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function Modal({ children, open, onClose }: ModalProps) {
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", closeOnEsc, false);

      return () => {
        document.removeEventListener("keydown", closeOnEsc, false);
      };
    }
  }, [onClose, open]);

  useEffect(() => {
    if (open) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      <Overlay onClose={onClose} />
      <div className="pointer-events-none fixed left-0 top-0 z-30 flex h-full w-full">
        <div className="pointer-events-none m-auto flex h-full w-full flex-col items-center justify-center gap-0 overflow-y-hidden p-4 md:max-h-[664px] md:max-w-4xl md:p-8">
          {children}
        </div>
      </div>
    </>
  );
}
