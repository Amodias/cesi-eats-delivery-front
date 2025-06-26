"use client";
import { Button } from "@/components/ui/button";

import {
  Ban,
  PenSquareIcon,
  Trash,
  EllipsisVertical,
  BadgeCheck,
  BadgeX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import DeleteModal from "@/components/delete-modal";
import UsersForm from "./form";

export default function CardActions({ data }) {
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="ml-auto flex size-10 rounded-md bg-white p-0 data-[state=open]:bg-muted dark:bg-slate-950"
          >
            <EllipsisVertical className="size-4" />
            <span className="sr-only">Ouvrir le menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={() => setShowForm(true)}
          >
            <PenSquareIcon className="size-4" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={() => setShowDeleteModal(true)}
          >
            <Trash className="size-4" /> Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UsersForm data={data} open={showForm} setOpen={setShowForm} />
      <DeleteModal
        name={data.name}
        id={data.id}
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        route="./clients/api"
        message="Le client n'aura plus accés a son compte. Cette action est irreversible."
      />
    </>
  );
}
