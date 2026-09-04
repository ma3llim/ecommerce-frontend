import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>Page Not Found - Ecommerce</title>
                <meta name="description" content="The page you're looking for could not be found on Ecommerce." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <main className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-8xl font-bold text-primary">404</p>
                    <h1 className="mt-4 text-3xl font-bold">Page Not Found</h1>
                    <p className="mt-2 text-muted-foreground">Sorry, the page you are looking for doesn't exist.</p>
                    <Button className="mt-6">
                        <Link to="/">Go Back Home</Link>
                    </Button>
                </div>
            </main>
        </>
    );
};

export default NotFound;
