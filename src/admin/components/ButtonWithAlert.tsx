import { AdminButton } from "@/components/common/AdminButton";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { AdminButtonVariant } from "@/types/ButtonVariant.types";
import { Trash2, type LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonWithAlertProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    buttonIcon?: LucideIcon;
    buttonTitle?: string;
    dialogTitle: string;
    dialogDesc?: string;
    dialogCancelTitle?: string;
    dialogActionTitle?: string;
    buttonVariant?: AdminButtonVariant;
    dialogActionfn: () => void;
}

const ButtonWithAlert = ({
    children,
    buttonIcon: ButtonIcon = Trash2,
    buttonTitle = "Delete",
    dialogTitle,
    dialogDesc,
    dialogCancelTitle = "Cancel",
    dialogActionTitle = "Continue",
    dialogActionfn,
    disabled,
    ...props
}: ButtonWithAlertProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <AdminButton disabled={disabled} variant="danger" {...props}>
                    <Trash2 className="size-4" />
                    {buttonTitle}
                </AdminButton>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>

                    {dialogDesc && <AlertDialogDescription>{dialogDesc}</AlertDialogDescription>}
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={disabled}>{dialogCancelTitle}</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" disabled={disabled} onClick={dialogActionfn}>
                        {dialogActionTitle}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ButtonWithAlert;
