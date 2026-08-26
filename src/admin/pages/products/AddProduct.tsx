import AddProductForm from "@/admin/components/products/AddProductForm";

const AddProduct = () => {
    return (
        <div className="mx-auto w-full">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Add Product</h1>
                <p className="text-sm text-muted-foreground">Create a new product for your store.</p>
            </div>

            <AddProductForm />
        </div>
    );
};

export default AddProduct;
