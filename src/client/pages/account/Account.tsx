import { Outlet } from "react-router-dom";
import AccountSidebar from "./AccountSidebar";
import Container from "@/client/components/Container";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/client/api/auth.api";
import { cleanUser } from "@/client/store/slice/UserAuth.slice";
import { persistor } from "@/store/store";
import ToastService from "@/services/ToastService";
import PageLoader from "@/components/common/PageLoader";

const Account = () => {
    const dispatch = useDispatch();
    const { mutate: logout, isPending } = useMutation({
        mutationFn: AuthApi.logoutUser,

        onSuccess: response => {
            dispatch(cleanUser());
            persistor.purge();
            ToastService.success(response.message || "Logged out successfully.");
        },

        onError: error => {
            dispatch(cleanUser());
            persistor.purge();
            ToastService.error(error?.message || "Logout failed. You have been logged out locally.");
        },
    });

    if (isPending) return <PageLoader />;
    return (
        <Container>
            <section className="w-full py-6 md:py-8">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
                    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
                        <AccountSidebar logout={logout} />

                        <main className="min-w-0 w-full">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default Account;
