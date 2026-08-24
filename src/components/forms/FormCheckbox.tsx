import type { UseFormRegisterReturn } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import FormError from "./FormError";

interface FormCheckboxProps {
    label: string;
    error?: string;
    registration?: UseFormRegisterReturn;
}

const FormCheckbox = ({ label, error, registration }: FormCheckboxProps) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Checkbox {...registration} id={registration?.name} />

                <label htmlFor={registration?.name} className="text-sm font-medium cursor-pointer">
                    {label}
                </label>
            </div>

            <FormError message={error} />
        </div>
    );
};

export default FormCheckbox;
