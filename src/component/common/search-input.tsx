"use client";

import React from "react";
import { SearchIcon } from "@/component/ui/Icon";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Cari...",
  id = "search-input",
}: SearchInputProps) {
  return (
    <div className="search-input-wrapper" id={id}>
      <div className="search-input-icon">
        <SearchIcon />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        aria-label={placeholder}
      />
      {value && (
        <button
          className="search-input-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
}
