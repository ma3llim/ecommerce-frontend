import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const ClientProtectedRoute = () => {
    const location = useLocation();
    const accessToken = useSelector((state: RootState) => state.userAuth.accessToken);

    if (!accessToken) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};

export default ClientProtectedRoute;
