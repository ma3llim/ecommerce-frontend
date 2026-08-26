import { Button } from "@/components/ui/button";

interface DataTablePaginationProps {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    selectedRows: number;
    onPageChange: (page: number) => void;
}

export function DataTablePagination({ page, size, totalElements, totalPages, selectedRows, onPageChange }: DataTablePaginationProps) {
    const start = totalElements === 0 ? 0 : page * size + 1;
    const end = Math.min((page + 1) * size, totalElements);

    return (
        <div className="flex items-center justify-between px-2">
            <div className="text-sm text-muted-foreground">
                Showing {start}–{end} of {totalElements}
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => onPageChange(page - 1)} disabled={page === 0}>
                        Previous
                    </Button>

                    <span className="text-sm">
                        Page {page + 1} of {totalPages}
                    </span>

                    <Button variant="outline" size="sm" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages - 1}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
