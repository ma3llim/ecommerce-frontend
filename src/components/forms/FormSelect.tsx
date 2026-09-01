import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormError from "./FormError";

interface FormSelectOption {
    label: string;
    value: string;
}

interface FormSelectProps<TFieldValues extends FieldValues> {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    label?: string;
    placeholder?: string;
    options: FormSelectOption[];
    error?: string;
}

const FormSelect = <TFieldValues extends FieldValues>({
    name,
    control,
    label,
    placeholder = "Select an option",
    options,
    error,
}: FormSelectProps<TFieldValues>) => {
    return (
        <div className="space-y-2">
            {label && <label className="text-sm font-medium">{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>

                        <SelectContent>
                            {options.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            ></Controller>

            <FormError message={error} />
        </div>
    );
};
export default FormSelect;
