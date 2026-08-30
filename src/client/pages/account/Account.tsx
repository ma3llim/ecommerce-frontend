import { Outlet } from "react-router-dom";
import AccountSidebar from "./AccountSidebar";
import Container from "@/client/components/Container";

const Account = () => {
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8">
            <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-[350px_minmax(0,1fr)]">
                <AccountSidebar />
                <main className="min-w-0 border-2 border-green-800">
                    <Container>
                        <Outlet />
                    </Container>
                </main>
            </div>
        </section>
    );
};

export default Account;
