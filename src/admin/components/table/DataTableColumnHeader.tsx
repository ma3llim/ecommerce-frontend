import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({ column, title }: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className="font-semibold">{title}</div>;
    }
    const sorted = column.getIsSorted();

    return (
        <Button variant="ghost" size="sm" className="-ml-3 h-8 px-3 font-semibold hover:bg-muted" onClick={() => column.toggleSorting()}>
            {title}
            {sorted === "asc" ? (
                <ArrowUp className="ml-2 size-4" />
            ) : sorted === "desc" ? (
                <ArrowDown className="ml-2 size-4" />
            ) : (
                <ChevronsUpDown className="ml-2 size-4 text-muted-foreground" />
            )}
        </Button>
    );
}
