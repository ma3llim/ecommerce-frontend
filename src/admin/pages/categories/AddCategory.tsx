import AddCategoryForm from "@/admin/components/AddCategoryForm";

const AddCategory = () => {
    return (
        <div className="mx-auto w-full max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Add Category</h1>

                <p className="text-sm text-muted-foreground">Create a new product category for your store.</p>
            </div>
            <AddCategoryForm />
        </div>
    );
};

export default AddCategory;
