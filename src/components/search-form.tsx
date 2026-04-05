"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";

interface SearchFormProps {
  onSearchChange?: (value: string) => void;
}

export function SearchForm({ onSearchChange }: SearchFormProps) {
  const [value, setValue] = useState("");

  // Debounce API call or parent update
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearchChange?.(value);
    }, 300);

    return () => clearTimeout(delay);
  }, [value, onSearchChange]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-w-md">
      {/* Search Icon */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

      {/* Controlled Input */}
      <Input
        id="search"
        value={value} // ✅ controlled
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search services..."
        className="pl-9 h-10"
      />
    </form>
  );
}