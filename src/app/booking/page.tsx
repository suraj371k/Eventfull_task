"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { Booking } from "@/schema/bookingSchema";
import toast from "react-hot-toast";

export default function BookingsTable() {
  const { bookings, deleteBooking } = useBookingStore();

  const columns: ColumnDef<Booking>[] = [
    {
      accessorKey: "artistName",
      header: "Artist",
    },
    {
      accessorKey: "clientName",
      header: "Client",
    },
    {
      accessorKey: "clientEmail",
      header: "Email",
    },
    {
      accessorKey: "eventDate",
      header: "Event Date",
      cell: ({ row }) => {
        const dateStr = row.getValue("eventDate");
        const date = new Date(dateStr as string);
        return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString();
      },
    },
    {
      accessorKey: "eventTime",
      header: "Event Time",
      cell: ({ row }) => row.getValue("eventTime"),
    },
    {
      accessorKey: "createdAt",
      header: "Booked On",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const booking = row.original;
        return (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              deleteBooking(booking.id);
              toast.success("Booking deleted");
            }}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No bookings found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}