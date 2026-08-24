import Dashboard from "@/admin/dashoarad/pages/Dashboard";
import AdminProtectedRoute from "@/admin/routes/AdminProtectedRoute";
import PageLoader from "@/components/PageLoader";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
const Login = lazy(() => import("@/admin/auth/pages/Login"));

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

            <Route element={<AdminProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
            </Route>
        </Route>
    );
};

export default AdminRoutes;
