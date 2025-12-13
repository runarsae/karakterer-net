"use client";

import { forwardRef, useRef, useState } from "react";

const THUMB_SIZE = 24;

interface Props {
  values: string[];
  currentSemesterIndex: number;
  onChange: (index: number) => void;
}

export default function SemesterSlider({
  values,
  currentSemesterIndex,
  onChange,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const percent =
    values.length > 1 ? (currentSemesterIndex / (values.length - 1)) * 100 : 0;

  const getIndexFromX = (clientX: number) => {
    if (!trackRef.current || values.length <= 1) return currentSemesterIndex;
    const { left, width } = trackRef.current.getBoundingClientRect();
    const trackWidth = width - THUMB_SIZE;
    const x = Math.max(
      0,
      Math.min(trackWidth, clientX - left - THUMB_SIZE / 2),
    );
    return Math.round((x / trackWidth) * (values.length - 1));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const newIndex = getIndexFromX(e.clientX);
    if (newIndex !== currentSemesterIndex) onChange(newIndex);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  return (
    <div className="relative p-[46px_32px_9px_32px]">
      <EdgeLabel align="left" label={values[0]} />
      <EdgeLabel align="right" label={values.at(-1)} />

      <Track
        ref={trackRef}
        onClick={(e) => !isDragging && onChange(getIndexFromX(e.clientX))}
      >
        <TickMarks count={values.length} />
        <Thumb
          percent={percent}
          label={values[currentSemesterIndex]}
          isDragging={isDragging}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
      </Track>
    </div>
  );
}

function EdgeLabel({
  align,
  label,
}: {
  align: "left" | "right";
  label?: string;
}) {
  return (
    <div
      className={`absolute top-0 h-[30px] w-16 rounded-sm bg-neutral-950 p-[5px_8px] text-center text-sm text-neutral-700 select-none ${align === "left" ? "left-0" : "right-0"}`}
    >
      {label}
    </div>
  );
}

const Track = forwardRef<
  HTMLDivElement,
  { onClick: (e: React.MouseEvent) => void; children: React.ReactNode }
>(({ onClick, children }, ref) => (
  <div
    ref={ref}
    className="relative h-[6px] w-full cursor-pointer rounded-sm bg-neutral-800"
    onClick={onClick}
  >
    {children}
  </div>
));

Track.displayName = "Track";

function TickMarks({ count }: { count: number }) {
  if (count <= 2) return null;
  return (
    <>
      {Array.from({ length: count - 2 }, (_, i) => (
        <div
          key={i}
          className="absolute top-0 h-[6px] w-px bg-neutral-700"
          style={{ left: `${((i + 1) / (count - 1)) * 100}%` }}
        />
      ))}
    </>
  );
}

function Thumb({
  percent,
  label,
  isDragging,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  percent: number;
  label: string;
  isDragging: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
}) {
  return (
    <div
      className={`absolute top-[-9px] h-6 w-6 cursor-grab touch-none rounded-sm outline-hidden hover:bg-neutral-600 focus:bg-neutral-600 active:cursor-grabbing ${isDragging ? "bg-neutral-600" : "bg-neutral-700"}`}
      style={{ left: `calc(${percent}% - ${THUMB_SIZE / 2}px)` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <ThumbLabel>{label}</ThumbLabel>
    </div>
  );
}

function ThumbLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-[-37px] left-[-20px] h-[30px] w-16 rounded-sm bg-neutral-800 p-[5px_8px] text-center text-sm text-neutral-300">
      {children}
    </div>
  );
}
