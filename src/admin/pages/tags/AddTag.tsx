import AddTagForm from "@/admin/components/tags/AddTagForm";
import { Helmet } from "react-helmet-async";

const AddTag = () => {
    return (
        <>
            <Helmet>
                <title>Add Tag | Admin</title>
                <meta name="description" content="Create a new product tag for the ecommerce catalog." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">Add Tag</h1>

                    <p className="text-sm text-muted-foreground">Create a new product tag for your store.</p>
                </div>

                <AddTagForm />
            </div>
        </>
    );
};

export default AddTag;
