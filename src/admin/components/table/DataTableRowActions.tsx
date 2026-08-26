import type { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { AdminButton } from "@/components/common/AdminButton";

interface DataTableRowAction<TData> {
    label: string;
    icon?: React.ReactNode;
    variant?: "primary" | "info" | "accent" | "success" | "danger";
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
                <AdminButton variant="info" className="h-8 px-3" onClick={() => onView(data)}>
                    <Eye className="mr-1 h-4 w-4" />
                    View
                </AdminButton>
            )}

            {onEdit && (
                <AdminButton variant="primary" className="h-8 px-3" onClick={() => onEdit(data)}>
                    <Pencil className="mr-1 h-4 w-4" />
                    Edit
                </AdminButton>
            )}

            {actions.map(action => (
                <AdminButton key={action.label} variant={action.variant ?? "accent"} className="h-8 px-3" onClick={() => action.onClick(data)}>
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.label}
                </AdminButton>
            ))}

            {onDelete && (
                <AdminButton variant="danger" className="h-8 px-3" onClick={() => onDelete(data)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </AdminButton>
            )}
        </div>
    );
}
