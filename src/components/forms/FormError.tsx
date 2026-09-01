interface FromErrorProps {
    message?: string;
}

const FormError = ({ message }: FromErrorProps) => {
    if (!message) return null;

    return <p className="text-sm text-destructive">{message}</p>;
};

export default FormError;
