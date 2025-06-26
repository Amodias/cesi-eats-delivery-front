"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { ClientOrderHistoryDataTableToolbar } from "@/app/admin/clients/order-history-data-table-toolbar";

export function DataTable({ columns, data, page, wilayas }) {
  const router = useRouter();

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({
    purchased_value: false,
    sold_value: false,
    lost_value: false,
  });
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      {page === "adminClient" && (
        <ClientOrderHistoryDataTableToolbar table={table} />
      )}

      <div className="rounded-md border border-input">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-input hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="text-nowrap text-primary"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                let id;
                let hasHover = false;
                if (page === "order" || page === "order-history")
                  id = row.original.id_order;
                if (page === "purchase") id = row.original.id_purchase;
                if (page === "stock") id = row.original.id_product;

                if (
                  [
                    "order",
                    "order-history",
                    "purchase",
                    "product",
                    "stock",
                  ].includes(page)
                )
                  hasHover = true;
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      hasHover && "cursor-pointer",
                      "border-input hover:bg-muted/30 data-[state=selected]:bg-secondary/10",
                    )}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const handleRedirect = () => {
                        if (cell.column.id === "actions") return;
                        if (page === "order" || page === "order-history")
                          router.push(`/dashboard/orders/${id}`);
                        if (page === "purchase")
                          router.push(`/dashboard/purchases/${id}`);

                        if (page === "stock")
                          router.push(`/dashboard/stock-overview/${id}`);
                      };

                      return (
                        <TableCell key={cell.id} onClick={handleRedirect}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
