"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
// import { SearchForm } from "./search-form";
import Sort from "./Sort";
import CreateServiceModal from "@/pages/admin/CreateServiceModal";
import { SearchForm } from "./search-form";

type ServiceToolbarProps = {
    onSearchChange?: (value: string) => void;
    onSortChange?: (value: string) => void;
};

export default function ServiceToolbar({ onSearchChange, onSortChange }: ServiceToolbarProps) {

    return (
        <div className="sm:flex items-center justify-between gap-2 space-y-2 sm:space-y-0 w-full my-4">
            <div className="flex items-center gap-4">
                {/* Search */}
                <SearchForm onSearchChange={onSearchChange} />

                {/* Sort */}
                <Sort onChange={onSortChange} />
            </div>

            <div className="flex items-end gap-2">
                {/* Register User Modal */}
                <CreateServiceModal />
            </div>
        </div>
    );
}