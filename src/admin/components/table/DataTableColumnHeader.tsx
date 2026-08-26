import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({ column, title }: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div>{title}</div>;
    }

    const sorted = column.getIsSorted();

    return (
        <Button variant="ghost" className="-ml-3 h-8" onClick={() => column.toggleSorting()}>
            {title}

            {sorted === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
            ) : sorted === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
        </Button>
    );
}
