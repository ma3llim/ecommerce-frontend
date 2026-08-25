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
import { Button } from "@/components/ui/button";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonWithAlertProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    dialogTitle: string;
    dialogDesc?: string;
    dialogCancelTitle?: string;
    dialogActionTitle?: string;
    dialogActionfn: () => void;
}

const ButtonWithAlert = ({
    children,
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
                <Button {...props}>{children}</Button>
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
