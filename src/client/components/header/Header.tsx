import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, UserRound, Truck, LogOut } from "lucide-react";
import SearchComponent from "./SearchComponent";
import ThemeToggle from "@/providers/ThemeToggle";
import capitalize from "lodash/capitalize";
import { useDispatch, useSelector } from "react-redux";
import { persistor, type RootState } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/client/api/auth.api";
import { cleanUser } from "@/client/store/slice/UserAuth.slice";
import ToastService from "@/services/ToastService";

const headerNavigation = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/category" },
    { label: "Products", path: "/products" },
    { label: "Delivery", path: "/delivery" },
    { label: "About Us", path: "/about-us" },
    { label: "Secure Payment", path: "/secure-payment" },
    { label: "Contact Us", path: "/contact-us" },
];

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const logoutInProgress = useRef(false);
    const dispatch = useDispatch();
    const userAccessToken = useSelector((state: RootState) => state.userAuth.accessToken);

    const { mutate: logout, isPending } = useMutation({
        mutationFn: AuthApi.logoutUser,

        onSuccess: response => {
            logoutInProgress.current = false;
            dispatch(cleanUser());
            persistor.purge();
            ToastService.success(response.message || "Logged out successfully.");
        },

        onError: error => {
            logoutInProgress.current = false;
            dispatch(cleanUser());
            persistor.purge();
            ToastService.error(error?.message || "Logout failed. You have been logged out locally.");
        },
    });

    return (
        <header className="sticky top-0 z-50 w-full bg-background">
            <div className="flex min-h-19 items-center justify-between gap-6 px-4">
                <Link to="/" className="group shrink-0 font-heading text-2xl font-bold tracking-tight">
                    <span className="text-foreground transition-colors group-hover:text-primary">Sameer</span>
                    <span className="text-primary">Cart</span>
                </Link>

                <div className="hidden w-full max-w-xl md:block lg:max-w-2xl">
                    <SearchComponent />
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <Link
                        to="/cart"
                        aria-label="Shopping Cart"
                        className="group flex items-center gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-gray-950/5 dark:text-white"
                    >
                        <div className="relative">
                            <ShoppingCart className="h-5 w-5 text-foreground transition-colors group-hover:text-primary" />
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
                                0
                            </span>
                        </div>
                        <div className="hidden leading-tight sm:block">
                            <p className="text-xs text-muted-foreground">Cart</p>
                            <p className="text-sm font-semibold text-foreground">₹0.00</p>
                        </div>
                    </Link>
                    <div className="mx-1 hidden h-7 w-px bg-border sm:block" />

                    <ThemeToggle />

                    {userAccessToken ? (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/account/dashboard"
                                className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-950/5 dark:hover:bg-white/5"
                            >
                                <UserRound className="h-5 w-5 text-foreground transition-colors group-hover:text-primary" />

                                <div className="hidden leading-tight sm:block">
                                    <p className="text-xs text-muted-foreground">Welcome</p>

                                    <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">My Account</p>
                                </div>
                            </Link>

                            <button
                                type="button"
                                disabled={isPending}
                                onClick={() => logout()}
                                className="rounded-lg bg-destructive p-2 text-destructive-foreground shadow-sm transition-all duration-200 hover:bg-destructive/90 disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Logout"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="group flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-950/5 dark:hover:bg-white/5"
                        >
                            <UserRound className="h-5 w-5 text-foreground transition-colors group-hover:text-primary" />

                            <div className="hidden leading-tight sm:block">
                                <p className="text-xs text-muted-foreground">Welcome</p>

                                <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">Login / Register</p>
                            </div>
                        </Link>
                    )}

                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(prev => !prev)}
                        aria-label="Toggle navigation"
                        className="rounded-lg p-2.5 text-foreground transition-colors hover:bg-gray-950/5 dark:text-white hover:text-primary lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="px-4 pb-4 md:hidden">
                <SearchComponent />
            </div>

            <div className="hidden w-full bg-primary text-white lg:block">
                <div className="mx-auto flex min-h-12 items-center justify-between px-4">
                    <nav className="flex items-center gap-1">
                        {headerNavigation.map(nav => (
                            <Link
                                key={nav.path}
                                to={nav.path}
                                className="rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-foreground/10"
                            >
                                {capitalize(nav.label)}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-2 text-sm text-white lg:flex">
                        <Truck className="h-4 w-4" />
                        <span>
                            Free Delivery on orders above <span className="font-semibold text-white">₹999</span>
                        </span>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <nav className="border-t border-border bg-background py-3 lg:hidden">
                    <div className="flex flex-col gap-1 px-4">
                        {headerNavigation.map(item => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-gray-950/5 dark:text-white hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
