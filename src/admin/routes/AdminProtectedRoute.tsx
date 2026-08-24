import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminProtectedRoute = () => {
    const location = useLocation();
    const admin = useSelector((state: RootState) => state.AdminAuth.admin);

    if (!admin) {
        return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }
    return <Outlet />;
};

export default AdminProtectedRoute;
