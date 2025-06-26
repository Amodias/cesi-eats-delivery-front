"use client";
import Searchbar from "@/components/searchbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UsersForm from "./form";

export default function ProductsPageHeader() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="flex items-end justify-between gap-5">
      <Searchbar />
      <UsersForm open={showForm} setOpen={setShowForm}>
        <Button variant="" size="sm" className="flex gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block">Nouveau</span>
        </Button>
      </UsersForm>
    </div>
  );
}
