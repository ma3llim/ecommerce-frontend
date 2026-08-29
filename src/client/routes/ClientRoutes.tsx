import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import PageLoader from "@/components/common/PageLoader";
const Home = lazy(() => import("@/client/pages/Home"));

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
        </Route>
    );
};

export default ClientRoutes;
