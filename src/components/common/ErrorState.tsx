interface ErrorStateProps {
    message?: string;
}

const ErrorState = ({ message = "Something went wrong. Please try again." }: ErrorStateProps) => {
    return (
        <div className="flex items-center justify-center p-6">
            <p className="text-sm text-destructive">{message}</p>
        </div>
    );
};

export default ErrorState;
