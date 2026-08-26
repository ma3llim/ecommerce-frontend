import type { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface DataTableRowAction<TData> {
    label: string;
    icon?: React.ReactNode;
    onClick: (data: TData) => void;
}

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    onView?: (data: TData) => void;
    onEdit?: (data: TData) => void;
    onDelete?: (data: TData) => void;
    actions?: DataTableRowAction<TData>[];
}

export function DataTableRowActions<TData>({ row, onView, onEdit, onDelete, actions = [] }: DataTableRowActionsProps<TData>) {
    const data = row.original;

    return (
        <div className="flex flex-wrap items-center gap-2 max-w-32">
            {onView && (
                <Button variant="outline" size="sm" onClick={() => onView(data)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                </Button>
            )}

            {onEdit && (
                <Button variant="outline" size="sm" onClick={() => onEdit(data)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </Button>
            )}

            {actions.map(action => (
                <Button key={action.label} variant="outline" size="sm" onClick={() => action.onClick(data)}>
                    {action.icon && <span className="mr-2">{action.icon}</span>}

                    {action.label}
                </Button>
            ))}

            {onDelete && (
                <Button variant="destructive" size="sm" onClick={() => onDelete(data)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </Button>
            )}
        </div>
    );
}
