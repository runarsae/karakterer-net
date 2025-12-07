"use client";

import { useState } from "react";
import SearchModal from "@/components/common/search/SearchModal";

export default function SearchButton() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <>
      <button
        className="cursor-pointer rounded-full bg-sky-600 px-7 py-3 text-sm font-medium text-nowrap text-white transition-colors select-none hover:bg-sky-700"
        onClick={() => setSearchModalOpen(true)}
      >
        Søk etter emne
      </button>
      <SearchModal
        open={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
