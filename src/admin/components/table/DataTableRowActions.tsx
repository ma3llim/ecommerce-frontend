import { AdminButton } from "@/components/common/AdminButton";
import type { AdminButtonSize, AdminButtonVariant } from "@/types/ButtonVariant.types";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface DataTableRowAction {
    label: string;
    icon?: LucideIcon;
    variant?: AdminButtonVariant;
    size?: AdminButtonSize;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    custom?: ReactNode;
}

interface DataTableRowActionsProps {
    actions?: DataTableRowAction[];
}

export function DataTableRowActions({ actions = [] }: DataTableRowActionsProps) {
    return (
        <div className="flex flex-wrap items-center gap-2 justify-center">
            {actions.map((action, index) => {
                if (action.custom) {
                    return <div key={`${action.label}-${index}`}>{action.custom}</div>;
                }
                const Icon = action.icon;

                return (
                    <AdminButton
                        key={`${action.label}-${index}`}
                        variant={action.variant ?? "secondary"}
                        size="sm"
                        onClick={action.onClick}
                        // disabled={action.disabled}
                        className={action.className}
                    >
                        {Icon && <Icon className="size-4" />}
                        {action.label}
                    </AdminButton>
                );
            })}
        </div>
    );
}
