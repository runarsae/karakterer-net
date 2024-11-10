"use client";

import { useState } from "react";
import SearchModal from "@/components/common/search/SearchModal";

export default function SearchButton() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <>
      <button
        className="select-none text-nowrap rounded-full bg-sky-600 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-700"
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
