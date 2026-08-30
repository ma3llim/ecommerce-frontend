import { KeyRound, LayoutDashboard, LogOut, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

const AccountSidebar = () => {
    return (
        <aside className="w-full lg:sticky lg:top-24 border-2 border-amber-800">
            <div className="rounded-2xl border bg-card p-3 shadow-sm">
                <div className="px-3 py-4">
                    <h2 className="text-lg font-semibold">My Account</h2>

                    <p className="mt-1 text-sm text-muted-foreground">Manage your account</p>
                </div>

                <nav className="space-y-1">
                    <NavLink
                        to="/account/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`
                        }
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/account/change-password"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`
                        }
                    >
                        <KeyRound className="h-5 w-5" />
                        Change Password
                    </NavLink>

                    <NavLink
                        to="/account/addresses"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`
                        }
                    >
                        <MapPin className="h-5 w-5" />
                        Addresses
                    </NavLink>

                    <div className="my-3 border-t" />

                    <button
                        type="button"
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </nav>
            </div>
        </aside>
    );
};

export default AccountSidebar;
