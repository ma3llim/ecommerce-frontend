import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    return (
        <>
            <Helmet>
                <title>Admin Dashboard | ecommerce</title>
                <meta name="description" content="Admin dashboard for managing products, orders, users, payments, and other ecommerce operations." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            Dashboard
        </>
    );
};

export default Dashboard;
