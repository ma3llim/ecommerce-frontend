import AddProductForm from "@/admin/components/products/AddProductForm";
import { Helmet } from "react-helmet-async";

const AddProduct = () => {
    return (
        <>
            <Helmet>
                <title>Add Product | Admin</title>
                <meta name="description" content="Create and add a new product to the ecommerce catalog." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">Add Product</h1>
                    <p className="text-sm text-muted-foreground">Create a new product for your store.</p>
                </div>

                <AddProductForm />
            </div>
        </>
    );
};

export default AddProduct;
