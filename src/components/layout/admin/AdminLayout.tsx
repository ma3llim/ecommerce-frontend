import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-background text-text-primary">
            <AdminSidebar />

            <div className="min-h-screen">
                <AdminHeader />

                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
