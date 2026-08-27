import UpdateTagForm from "@/admin/components/tags/UpdateTagForm";
import { Helmet } from "react-helmet-async";

const EditTag = () => {
    return (
        <>
            <Helmet>
                <title>Edit Tag | Admin</title>
                <meta name="description" content="Update product tag information in the ecommerce admin panel." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">Edit Tag</h1>
                    <p className="text-sm text-muted-foreground">Update the product tag details.</p>
                </div>

                <UpdateTagForm />
            </div>
        </>
    );
};

export default EditTag;
