import { BrowserRouter } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <AdminRoutes />
        </BrowserRouter>
    );
};

export default AppRouter;
