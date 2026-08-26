import UpdateTagForm from "@/admin/components/tags/UpdateTagForm";

const EditTag = () => {
    return (
        <div className="mx-auto w-full max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Edit Tag</h1>
                <p className="text-sm text-muted-foreground">Update the product tag details.</p>
            </div>

            <UpdateTagForm />
        </div>
    );
};

export default EditTag;
