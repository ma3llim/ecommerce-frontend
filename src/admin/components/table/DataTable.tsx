import { flexRender, getCoreRowModel, getSortedRowModel, type ColumnDef, type SortingState, type VisibilityState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTableLoading } from "./DataTableLoading";
import { DataTableEmpty } from "./DataTableEmpty";
import { DataTablePagination } from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    loading?: boolean;
    emptyMessage?: string;
    searchKey?: string;
    searchPlaceholder?: string;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    loading = false,
    emptyMessage = "No Data Available",
    page,
    size,
    totalElements,
    totalPages,
    onPageChange,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
        enableRowSelection: true,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        pageCount: totalPages,
    });

    return (
        <div className="w-full">
            <div className="overflow-x-auto rounded-lg border border-border">
                <Table className="border-collapse">
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id} className="bg-muted/70 hover:bg-muted/70">
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id} className="h-11 border border-border px-4 text-sm font-semibold text-foreground">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <DataTableLoading colSpan={columns.length} />
                        ) : table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() ? "selected" : undefined}
                                    className="border-b odd:bg-background even:bg-muted/30 hover:bg-muted/60 data-[state=selected]:bg-muted transition-colors"
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id} className="border border-border/60 px-4 py-3">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <DataTableEmpty colSpan={columns.length} message={emptyMessage} />
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination table={table} page={page} size={size} totalElements={totalElements} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    );
}
