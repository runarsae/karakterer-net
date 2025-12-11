"use client";

import SearchIcon from "@/assets/icons/SearchIcon";
import { ChangeEvent, KeyboardEventHandler, useEffect, useRef } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import FadeIn from "@/components/common/animation/FadeIn";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  search: string;
  setSearch: (search: string) => void;
  isLoading: boolean;
  courses?: Course[];
  onClose: () => void;
}

export default function SearchInput({
  search,
  setSearch,
  isLoading,
  courses,
  onClose,
}: SearchInputProps) {
  const router = useRouter();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === "Enter") {
      if (!isLoading && courses && courses.length === 1) {
        router.push(`/courses/${courses[0].code}`);
        onClose();
      }
    }
  };

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchInputRef]);

  return (
    <div className="relative flex items-center gap-4">
      <div className="shrink-0">
        <SearchIcon />
      </div>
      <div className="flex grow items-center gap-2 border-b border-neutral-800">
        <input
          ref={searchInputRef}
          className="relative block h-[34px] w-full shrink bg-transparent py-0 pl-0 text-base text-neutral-300 lining-nums placeholder-neutral-500 outline-hidden"
          type="text"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          placeholder="Emnekode eller navn"
        />
        {isLoading && (
          <FadeIn delay={1}>
            <div className="shrink-0">
              <LoadingSpinner />
            </div>
          </FadeIn>
        )}
      </div>
      <div className="md:hidden">
        <button
          className="cursor-pointer transition-colors hover:text-neutral-300"
          onClick={onClose}
        >
          Avbryt
        </button>
      </div>
    </div>
  );
}
