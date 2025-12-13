"use client";

import { useRef, useEffect } from "react";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import Button from "@/components/common/Button";
import SelectableTextButton from "@/components/common/SelectableTextButton";

interface MobileSemesterNavProps {
  semesters: string[];
  currentSemesterIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onChange: (index: number) => void;
}

export default function SemesterStepper({
  semesters,
  currentSemesterIndex,
  onPrevious,
  onNext,
  onChange,
}: MobileSemesterNavProps) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isAtStart = currentSemesterIndex === 0;
  const isAtEnd = currentSemesterIndex === semesters.length - 1;

  useEffect(() => {
    const selectedItem = itemRefs.current[currentSemesterIndex];

    if (selectedItem) {
      selectedItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentSemesterIndex]);

  return (
    <div className="flex items-center gap-2 px-2 py-2">
      <div className="scrollbar-hidden flex flex-1 items-center gap-2 overflow-x-auto">
        {semesters.map((semester, index) => (
          <SelectableTextButton
            key={semester}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onClick={() => onChange(index)}
            selected={index === currentSemesterIndex}
          >
            {semester}
          </SelectableTextButton>
        ))}
      </div>

      <Button onClick={onPrevious} disabled={isAtStart}>
        <ArrowRightIcon className="rotate-180" width={20} height={20} />
      </Button>

      <Button onClick={onNext} disabled={isAtEnd}>
        <ArrowRightIcon width={20} height={20} />
      </Button>
    </div>
  );
}
