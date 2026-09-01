import type { ComponentProps } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import FormError from "./FormError";

interface FormInputProps extends ComponentProps<"input"> {
    label?: string;
    error?: string;
    registration?: UseFormRegisterReturn;
}

const FormInput = ({ label, error, registration, id, disabled = false, ...props }: FormInputProps) => {
    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id} className="text-sm font-medium">
                    {label}
                </label>
            )}
            <Input disabled={disabled} id={id} {...registration} {...props} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} />

            <div id={error ? `${id}-error` : undefined}>
                <FormError message={error} />
            </div>
        </div>
    );
};

export default FormInput;
