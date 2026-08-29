import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import PageLoader from "@/components/common/PageLoader";

const Home = lazy(() => import("@/client/pages/Home"));
const AboutUs = lazy(() => import("@/client/pages/AboutUs"));
const Categories = lazy(() => import("@/client/pages/Categories"));
const SecurePayment = lazy(() => import("@/client/pages/SecurePayment"));
const Delivery = lazy(() => import("@/client/pages/Delivery"));

const ClientRoutes = () => {
    return (
        <Route path="/" element={<ClientLayout />}>
            <Route
                index
                element={
                    <Suspense fallback={<PageLoader />}>
                        <Home />
                    </Suspense>
                }
            />
            <Route
                path="/about-us"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <AboutUs />
                    </Suspense>
                }
            />
            <Route
                path="/category"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <Categories />
                    </Suspense>
                }
            />
            <Route
                path="/delivery"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <Delivery />
                    </Suspense>
                }
            />
            <Route
                path="/secure-payment"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <SecurePayment />
                    </Suspense>
                }
            />
        </Route>
    );
};

export default ClientRoutes;
