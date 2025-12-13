import { useState, useRef } from "react";

export function useSemesterNavigation(semesters: string[]) {
  const lastIndex = semesters.length - 1;
  const prevSemesters = useRef(semesters);
  const [index, setIndex] = useState(lastIndex);

  const selectedIndex = prevSemesters.current === semesters ? index : lastIndex;

  const goToIndex = (i: number) => {
    if (i >= 0 && i <= lastIndex) {
      prevSemesters.current = semesters;
      setIndex(i);
    }
  };

  return {
    selectedIndex,
    canGoPrevious: selectedIndex > 0,
    canGoNext: selectedIndex < lastIndex,
    goPrevious: () => goToIndex(selectedIndex - 1),
    goNext: () => goToIndex(selectedIndex + 1),
    goToIndex,
  };
}
