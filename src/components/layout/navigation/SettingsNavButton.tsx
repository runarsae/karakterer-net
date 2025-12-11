"use client";

import SettingsIcon from "@/assets/icons/SettingsIcon";
import { IconButton } from "../../common/IconButton";
import { useEffect, useRef, useState } from "react";
import Settings from "../Settings";

export default function SettingsNavButton() {
  const [open, setOpen] = useState(false);

  const settingsButtonRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const clickOutsideSettings =
        settingsRef.current && !settingsRef.current.contains(e.target as Node);

      const clickOutsideSettingsButton =
        settingsButtonRef.current &&
        !settingsButtonRef.current.contains(e.target as Node);

      if (clickOutsideSettings && clickOutsideSettingsButton) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "Escape") {
        setOpen(false);
      }
    }

    document.body.addEventListener("mousedown", handleClickOutside);
    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [settingsRef, setOpen]);

  return (
    <div ref={settingsButtonRef}>
      <IconButton
        label="Innstillinger"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        icon={<SettingsIcon />}
      />
      <Settings ref={settingsRef} open={open} />
    </div>
  );
}
