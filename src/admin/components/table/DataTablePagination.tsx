import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function DataTablePagination<TData>({ page, size, totalElements, totalPages, onPageChange }: DataTablePaginationProps<TData>) {
    const start = totalElements === 0 ? 0 : page * size + 1;
    const end = Math.min((page + 1) * size, totalElements);

    return (
        <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
                <span className="ml-6">
                    Showing {start} to {end} of {totalElements} entries
                </span>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => onPageChange(page - 1)} disabled={page <= 0}>
                    Previous
                </Button>

                <span className="px-2 text-sm text-muted-foreground">
                    Page {page + 1} of {totalPages}
                </span>

                <Button variant="outline" size="sm" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages - 1}>
                    Next
                </Button>
            </div>
        </div>
    );
}
