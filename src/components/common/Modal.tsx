"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import Overlay from "./Overlay";
import { disableScroll, enableScroll } from "@/utils/scroll";
import Fade from "./animation/Fade";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function Modal({ children, open, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
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

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <Fade>
          <Overlay onClose={onClose} />
          <div className="pointer-events-none fixed top-0 left-0 z-30 flex h-full w-full">
            <div className="pointer-events-none m-auto flex h-full w-full flex-col items-center justify-center gap-0 overflow-y-hidden p-4 md:max-h-[664px] md:max-w-4xl md:p-8">
              {children}
            </div>
          </div>
        </Fade>
      )}
    </AnimatePresence>,
    document.body,
  );
}
