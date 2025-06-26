"use client";

import { DataTableColumnHeader } from "./order-history-data-table-column-header";

import { formatPrice, formatDateTime } from "@/lib/utils";

export const orderHistoryColumns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="N˚" />
    ),

    cell: ({ row }) => <div className="w-fit">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return Number(value) === row.getValue(id);
    },
  },
  {
    accessorKey: "products",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nb. produits" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="">{row.original.products.length}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Montant total" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{formatPrice(Number(row.original.totalAmount))}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "shipping_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Montant livraison" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>
            <span>{formatPrice(Number(row.original.shippingAmount))}</span>
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{formatDateTime(row.getValue("createdAt"))}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
];
