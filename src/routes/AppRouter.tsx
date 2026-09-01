import AdminRoutes from "@/admin/routes/AdminRoutes";
import ClientRoutes from "@/client/routes/ClientRoutes";
import { BrowserRouter, Routes } from "react-router-dom";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {AdminRoutes()}
                {ClientRoutes()}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
