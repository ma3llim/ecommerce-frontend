import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../../components/layout/admin/AdminLayout';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<div>Admin Dashboard</div>} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
