"use client";

import SearchIcon from "@/assets/icons/SearchIcon";
import { IconButton } from "../../common/IconButton";
import { useState } from "react";
import SearchModal from "@/components/common/search/SearchModal";

export default function SearchNavButton() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <>
      <IconButton
        label="Søk"
        onClick={() => {
          setSearchModalOpen(true);
        }}
        icon={<SearchIcon />}
      />
      <SearchModal
        open={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
