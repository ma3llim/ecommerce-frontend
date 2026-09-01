import { LoaderCircle } from "lucide-react";

const PageLoader = () => {
    return (
        <div className="flex items-center justify-center h-16">
            <LoaderCircle className="size-8 animate-spin text-primary" aria-label="Loading" />
        </div>
    );
};

export default PageLoader;
