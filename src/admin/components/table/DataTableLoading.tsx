import { TableCell, TableRow } from "@/components/ui/table";
import PageLoader from "@/components/common/PageLoader";

interface DataTableLoadingProps {
    colSpan: number;
}

export function DataTableLoading({ colSpan }: DataTableLoadingProps) {
    return (
        <TableRow className="hover:bg-transparent">
            <TableCell colSpan={colSpan} className="h-32 border border-border text-center">
                <div className="flex items-center justify-center">
                    <PageLoader />
                </div>
            </TableCell>
        </TableRow>
    );
}
