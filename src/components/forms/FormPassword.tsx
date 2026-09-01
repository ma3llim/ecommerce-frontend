import type { ComponentProps } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "../ui/input";
import FormError from "./FormError";

interface FormPasswordProps extends Omit<ComponentProps<"input">, "type"> {
    label?: string;
    error?: string;
    registration?: UseFormRegisterReturn;
}

const FormPassword = ({ label, error, registration, id, disabled, ...props }: FormPasswordProps) => {
    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id} className="text-sm font-medium">
                    {label}
                </label>
            )}

            <Input id={id} disabled={disabled} type="password" {...registration} {...props} aria-invalid={!!error} />

            <div id={error ? `${id}-error` : undefined}>
                <FormError message={error} />
            </div>
        </div>
    );
};

export default FormPassword;
