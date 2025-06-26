"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";

export function ClientOrderHistoryDataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center gap-2 sm:justify-between">
      <div className="flex items-center space-x-2 sm:flex-1">
        <Input
          type="number"
          placeholder="Rechercher un n˚ de commande"
          value={table.getColumn("id_order")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("id_order")?.setFilterValue(event.target.value)
          }
          className="w-[180px] lg:w-[260px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Réinitialiser
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
