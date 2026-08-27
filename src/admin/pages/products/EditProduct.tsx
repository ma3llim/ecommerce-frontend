import UpdateProductForm from "@/admin/components/products/UpdateProductForm";
import { Helmet } from "react-helmet-async";
const EditProduct = () => {
    return (
        <>
            <Helmet>
                <title>Edit Product | Admin</title>
                <meta name="description" content="Update product information, pricing, inventory, images, tags, and other product details." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">Edit Product</h1>
                    <p className="text-sm text-muted-foreground">Update the product information for your store.</p>
                </div>

                <UpdateProductForm />
            </div>
        </>
    );
};

export default EditProduct;
