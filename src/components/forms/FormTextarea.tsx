import type { ComponentProps } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import FormError from "./FormError";

interface FormTextareaProps extends ComponentProps<"textarea"> {
    label?: string;
    error?: string;
    registration?: UseFormRegisterReturn;
}

const FormTextarea = ({ label, error, registration, id, disabled, ...props }: FormTextareaProps) => {
    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id} className="text-sm font-medium">
                    {label}
                </label>
            )}

            <Textarea id={id} disabled={disabled} {...registration} {...props} aria-invalid={!!error} />

            <div id={error ? `${id}-error` : undefined}>
                <FormError message={error} />
            </div>
        </div>
    );
};

export default FormTextarea;
