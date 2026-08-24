import { AdminAuthApi } from "@/admin/auth/api/AdminAuth.api";
import type { Admin, NavUserProps } from "@/admin/auth/types/AdminAuth.types";
import { cleanAdmin } from "@/admin/store/slice/AdminAuth.slice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import ToastService from "@/services/ToastService";
import { useMutation } from "@tanstack/react-query";
import { ChevronsUpDownIcon, LogOutIcon, UserShield } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function NavUser({ email, firstName, lastName, role }: NavUserProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: () => AdminAuthApi.logout(),
        onSuccess: () => {
            ToastService.success("Logout Successfully");
            dispatch(cleanAdmin());

            navigate("/admin/login", { replace: true });
        },
        onError: error => {
            ToastService.error(error.message);
        },
    });

    const { isMobile } = useSidebar();
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger render={<SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />}>
                        <Avatar>
                            <AvatarImage src="https://ui.shadcn.com/avatars/shadcn.jpg" alt={firstName + " " + lastName} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{firstName + " " + lastName}</span>
                            <span className="truncate text-xs">{email}</span>
                        </div>
                        <ChevronsUpDownIcon className="ml-auto size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-fit" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar>
                                        <AvatarImage src="https://ui.shadcn.com/avatars/shadcn.jpg" alt={firstName + " " + lastName} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{firstName + " " + lastName}</span>
                                        <span className="truncate text-xs">{email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            {/* <DropdownMenuItem>
                                <BadgeCheckIcon />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCardIcon />
                                Billing
                            </DropdownMenuItem> */}
                            <DropdownMenuItem>
                                <UserShield />
                                Role: {role.charAt(0) + role.slice(1).toLocaleLowerCase()}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled={isPending} onClick={() => mutate()}>
                            <LogOutIcon />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
