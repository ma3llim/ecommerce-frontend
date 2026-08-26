import { TableCell, TableRow } from "@/components/ui/table";

interface DataTableEmptyProps {
    colSpan: number;
    message: string;
}

export function DataTableEmpty({ colSpan, message }: DataTableEmptyProps) {
    return (
        <TableRow className="hover:bg-transparent">
            <TableCell colSpan={colSpan} className="h-24 border border-border text-center text-sm text-muted-foreground ">
                {message}
            </TableCell>
        </TableRow>
    );
}
