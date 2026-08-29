import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import PageLoader from "@/components/common/PageLoader";

const Home = lazy(() => import("@/client/pages/Home"));
const AboutUs = lazy(() => import("@/client/pages/AboutUs"));
const Categories = lazy(() => import("@/client/pages/Categories"));

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
        </Route>
    );
};

export default ClientRoutes;
