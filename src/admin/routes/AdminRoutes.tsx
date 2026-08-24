import PageLoader from "@/components/PageLoader";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Adminlayout from "../layout/Adminlayout";
const Login = lazy(() => import("@/admin/auth/pages/Login"));
const Dashboard = lazy(() => import("@/admin/dashoarad/pages/Dashboard"));

const AdminRoutes = () => {
    return (
        <Route path="/admin">
            <Route
                path="login"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <Login />
                    </Suspense>
                }
            />

            <Route element={<Adminlayout />}>
                <Route
                    path="dashboard"
                    element={
                        <Suspense fallback={<PageLoader />}>
                            <Dashboard />
                        </Suspense>
                    }
                />
            </Route>
        </Route>
    );
};

export default AdminRoutes;
