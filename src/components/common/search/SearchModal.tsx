"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import Modal from "@/components/common/Modal";
import SearchInput from "./SearchInput";
import SearchError from "./SearchError";
import { useResizeDetector } from "react-resize-detector";
import SearchResults from "./SearchResults";
import useCourseSearch from "@/hooks/useCourseSearch";
import { usePathname } from "next/navigation";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const pathname = usePathname();

  const [path, setPath] = useState(pathname);

  const [search, setSearch] = useState("");

  const { courses, isLoading, error } = useCourseSearch(search);

  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const { ref: containerRef } = useResizeDetector({
    handleWidth: false,
    onResize: ({ entry }) => {
      if (entry) setContainerHeight(entry.target.clientHeight);
    },
  });

  const { ref: headerRef } = useResizeDetector({
    handleWidth: false,
    onResize: ({ entry }) => {
      if (entry) setHeaderHeight(entry.target.scrollHeight);
    },
  });

  const { ref: contentRef } = useResizeDetector({
    handleWidth: false,
    onResize: ({ entry }) => {
      if (entry) setContentHeight(entry.target.scrollHeight);
    },
  });

  const computedCardHeight = useMemo(() => {
    if (headerHeight + contentHeight > containerHeight) {
      return containerHeight;
    }

    return headerHeight + contentHeight;
  }, [headerHeight, contentHeight, containerHeight]);

  const scrollbarVisible = useMemo(
    () => headerHeight + contentHeight > containerHeight,
    [headerHeight, contentHeight, containerHeight],
  );

  const handleModalClose = useCallback(() => {
    onClose();
    setSearch("");
    setContainerHeight(0);
    setHeaderHeight(0);
    setContentHeight(0);
  }, [onClose]);

  useEffect(() => {
    // Close modal if pathname changes
    if (pathname === path) return;

    setPath(pathname);
    if (open) handleModalClose();
  }, [handleModalClose, open, path, pathname]);

  return (
    <Modal open={open} onClose={handleModalClose}>
      <div
        ref={containerRef}
        className="pointer-events-none relative h-full w-full overflow-y-hidden"
      >
        <motion.div
          className="pointer-events-auto relative rounded-sm bg-neutral-925 px-4 py-0 md:px-6"
          animate={{ height: computedCardHeight || "auto" }}
          transition={{ duration: 0.15 }}
          style={{
            overflowY: scrollbarVisible ? "auto" : "hidden",
          }}
        >
          <div ref={headerRef} className="sticky left-0 top-0 w-full">
            <div className="bg-neutral-925 py-4 md:py-6">
              <SearchInput
                search={search}
                setSearch={setSearch}
                isLoading={isLoading}
                courses={courses}
                onClose={handleModalClose}
              />
            </div>
          </div>
          <div ref={contentRef}>
            {error ? (
              <SearchError error={error} />
            ) : (
              courses &&
              courses.length > 0 && <SearchResults courses={courses} />
            )}
          </div>
        </motion.div>
      </div>
    </Modal>
  );
}
