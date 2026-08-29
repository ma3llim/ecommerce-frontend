import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const ClientLayout = () => {
    return (
        <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
            <Header />
            <main className="grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default ClientLayout;
