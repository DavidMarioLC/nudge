import { ChevronsUpDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { signOut, useSession } from "@/lib/auth-client";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/shared/components/ui/sidebar";

export function NavUser() {
	const navigate = useNavigate();
	const { data } = useSession();
	const user = data?.user;

	function handleLogout() {
		signOut({
			fetchOptions: {
				onSuccess: () => navigate("/"),
			},
		});
	}
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
						<Avatar className="h-8 w-8 rounded-lg">
							<AvatarFallback className="rounded-lg bg-transparent">
								{user?.name.at(0)}
							</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">{user?.name}</span>
							<span className="truncate text-xs">{user?.email}</span>
						</div>
						<ChevronsUpDown className="ml-auto size-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuItem>Profile</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={handleLogout}>
								<LogOut /> Logout
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
