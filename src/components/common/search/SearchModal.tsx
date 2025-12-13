"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import Modal from "@/components/common/Modal";
import SearchInput from "./SearchInput";
import SearchError from "./SearchError";
import SearchResults from "./SearchResults";
import useCourseSearch from "@/hooks/useCourseSearch";
import useElementSize from "@/hooks/useElementSize";
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

  const { ref: containerRef, clientHeight: containerHeight } = useElementSize();
  const { ref: headerRef, scrollHeight: headerHeight } = useElementSize();
  const { ref: contentRef, scrollHeight: contentHeight } = useElementSize();

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
          className="bg-neutral-925 pointer-events-auto relative rounded-sm px-4 py-0 md:px-6"
          initial={false}
          animate={{
            height: computedCardHeight > 0 ? computedCardHeight : "auto",
          }}
          transition={{ duration: 0.15 }}
          style={{
            overflowY: scrollbarVisible ? "auto" : "hidden",
          }}
        >
          <div ref={headerRef} className="sticky top-0 left-0 w-full">
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
