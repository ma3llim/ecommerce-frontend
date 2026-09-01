import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/providers/ThemeToggle";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

const Adminlayout = () => {
    const location = useLocation();
    const { admin, accessToken } = useSelector((state: RootState) => state.AdminAuth);

    if (!admin || !accessToken) {
        return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }
    return (
        <SidebarProvider>
            <AppSidebar user={admin} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b-2 mb-4">
                    {/* <header className="mx-4 mt-4 flex h-16 shrink-0 items-center rounded-xl border bg-background shadow-sm"> */}
                    <div className="flex w-full items-center px-4 justify-between">
                        <div className="flex justify-center items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4 mt-2" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <Link to={"/admin/dashboard"} className="transition-colors hover:text-foreground">
                                            Home
                                        </Link>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <ThemeToggle />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Adminlayout;
