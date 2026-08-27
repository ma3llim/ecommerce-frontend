import AddCategoryForm from "@/admin/components/AddCategoryForm";
import { Helmet } from "react-helmet-async";

const AddCategory = () => {
    return (
        <>
            <Helmet>
                <title>Add Category | ecommerce</title>
                <meta name="description" content="Create a new product category for the ecommerce store." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">Add Category</h1>

                    <p className="text-sm text-muted-foreground">Create a new product category for your store.</p>
                </div>
                <AddCategoryForm />
            </div>
        </>
    );
};

export default AddCategory;
