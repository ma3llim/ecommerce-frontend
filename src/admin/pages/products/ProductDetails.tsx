import { Helmet } from "react-helmet-async";

const ProductDetails = () => {
    return (
        <>
            <Helmet>
                <title>Product Details | Admin</title>
                <meta name="description" content="View detailed product information, pricing, inventory, variants, images, tags, and product status." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
        </>
    );
};

export default ProductDetails;
