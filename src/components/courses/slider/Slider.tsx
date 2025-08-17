"use client";

import { useEffect, useRef, useState } from "react";
import { Range } from "react-range";
import ExtremeTickLabel from "./ExtremeTickLabel";

interface Props {
  values: string[];
  currentValueIndex: number;
  onChange: (index: number) => void;
}

export default function Slider({ values, currentValueIndex, onChange }: Props) {
  const [showMinLabel, setShowMinLabel] = useState<boolean>(true);
  const [showMaxLabel, setShowMaxLabel] = useState<boolean>(true);

  const minLabelDivRef = useRef<HTMLDivElement>(null);
  const maxLabelDivRef = useRef<HTMLDivElement>(null);
  const labelDivRef = useRef<HTMLDivElement>(null);

  // Check if two elements are colliding
  const isColliding = (a: HTMLDivElement, b: HTMLDivElement) => {
    const rect1 = a.getBoundingClientRect();
    const rect2 = b.getBoundingClientRect();

    const isInHoriztonalBounds =
      rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
    const isInVerticalBounds =
      rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;

    return isInHoriztonalBounds && isInVerticalBounds;
  };

  // Toggle visibility to min/max labels according to if they are colliding with the value label or not
  useEffect(() => {
    if (minLabelDivRef.current && labelDivRef.current) {
      if (isColliding(minLabelDivRef.current, labelDivRef.current)) {
        setShowMinLabel(false);
      } else {
        setShowMinLabel(true);
      }
    }

    if (maxLabelDivRef.current && labelDivRef.current) {
      if (isColliding(maxLabelDivRef.current, labelDivRef.current)) {
        setShowMaxLabel(false);
      } else {
        setShowMaxLabel(true);
      }
    }
  }, [currentValueIndex]);

  return (
    <div className="relative p-[46px_32px_9px_32px]">
      <ExtremeTickLabel
        ref={minLabelDivRef}
        align="left"
        visible={showMinLabel}
        label={values.at(0)}
      />
      <ExtremeTickLabel
        ref={maxLabelDivRef}
        align="right"
        visible={showMaxLabel}
        label={values.at(-1)}
      />
      <Range
        max={values.length - 1}
        values={[currentValueIndex]}
        onChange={(values) => onChange(values[0])}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{ ...props.style }}
            className="h-[6px] w-full rounded-sm bg-neutral-800"
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            key={props.key}
            style={{ ...props.style }}
            className={`h-[24px] w-[24px] rounded-sm transition-colors ${isDragged ? "bg-neutral-600" : "bg-neutral-700"} outline-hidden hover:bg-neutral-600 focus:bg-neutral-600`}
            onKeyDown={undefined}
          >
            <div
              ref={labelDivRef}
              className="absolute left-[-20px] top-[-37px] h-[30px] w-[64px] rounded-sm bg-neutral-800 p-[5px_8px] text-center text-sm text-neutral-300"
            >
              {values[currentValueIndex]}
            </div>
          </div>
        )}
        renderMark={({ props, index }) => {
          if (index !== 0 && index !== values.length - 1) {
            return (
              <div
                {...props}
                key={props.key}
                style={{ ...props.style }}
                className="h-[6px] w-px bg-neutral-700"
              />
            );
          }
        }}
      />
    </div>
  );
}
