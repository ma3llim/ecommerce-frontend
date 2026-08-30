import { KeyRound, LayoutDashboard, LogOut, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

const AccountSidebar = () => {
    return (
        <aside className="w-full lg:sticky lg:top-24">
            <div className="rounded-2xl border bg-card p-2 shadow-sm lg:p-3">
                {/* Sidebar Header */}
                <div className="hidden px-3 py-4 lg:block">
                    <h2 className="text-lg font-semibold">My Account</h2>

                    <p className="mt-1 text-sm text-muted-foreground">Manage your account</p>
                </div>

                {/* Navigation */}
                <nav className="flex gap-1 overflow-x-auto scrollbar-none lg:block lg:space-y-1">
                    <NavLink
                        to="/account/dashboard"
                        className={({ isActive }) =>
                            `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors lg:gap-3 ${
                                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`
                        }
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/account/change-password"
                        className={({ isActive }) =>
                            `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors lg:gap-3 ${
                                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`
                        }
                    >
                        <KeyRound className="h-5 w-5" />
                        <span>Change Password</span>
                    </NavLink>

                    <NavLink
                        to="/account/addresses"
                        className={({ isActive }) =>
                            `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors lg:gap-3 ${
                                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`
                        }
                    >
                        <MapPin className="h-5 w-5" />
                        <span>Addresses</span>
                    </NavLink>

                    <div className="hidden lg:block">
                        <div className="my-3 border-t" />

                        <button
                            type="button"
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AccountSidebar;
