import { useLayoutEffect, useRef, useState } from "react";

interface ElementSize {
  clientWidth: number;
  clientHeight: number;
  scrollWidth: number;
  scrollHeight: number;
  offsetWidth: number;
  offsetHeight: number;
}

const initialSize: ElementSize = {
  clientWidth: 0,
  clientHeight: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  offsetWidth: 0,
  offsetHeight: 0,
};

export default function useElementSize() {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [size, setSize] = useState<ElementSize>(initialSize);

  useLayoutEffect(() => {
    if (!element) {
      setSize(initialSize);
      return;
    }

    const updateSize = () => {
      setSize({
        clientWidth: element.clientWidth,
        clientHeight: element.clientHeight,
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight,
        offsetWidth: element.offsetWidth,
        offsetHeight: element.offsetHeight,
      });
    };

    updateSize();

    observerRef.current = new ResizeObserver(updateSize);
    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [element]);

  return { ref: setElement, ...size };
}
