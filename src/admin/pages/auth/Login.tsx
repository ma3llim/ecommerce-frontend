import AdminLoginForm from "../../components/AdminLoginForm";
import { Helmet } from "react-helmet-async";

const Login = () => {
    return (
        <>
            <Helmet>
                <title>Admin Login | ecommerce</title>
                <meta name="description" content="Secure login to access the admin panel of ecommerce. Manage products, orders, and users efficiently." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <section className="flex min-h-screen w-full items-center justify-center bg-background px-4">
                <div className="w-full max-w-md">
                    <div className="rounded-xl border bg-card p-8 shadow-xl">
                        <div className="mb-6 text-center">
                            <h1 className="font-heading text-3xl font-bold tracking-tight">Admin Panel</h1>

                            <p className="mt-2 text-sm text-muted-foreground">Sign in to start your session</p>
                        </div>

                        <AdminLoginForm />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
