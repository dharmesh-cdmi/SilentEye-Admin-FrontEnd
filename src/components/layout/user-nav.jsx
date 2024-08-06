import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthUserContext } from "@/context/AuthUserProvider";
import { removeTokens } from "@/utils/localStorageUtils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { RotateCw } from "lucide-react";
import { LogoutIcon } from "@/assets/icons";

export function UserNav() {
  let navigate = useNavigate();
  const { userData, userRefetch } = useAuthUserContext();
  const queryClient = useQueryClient();

  const logout = async () => {
    await removeTokens();
    userRefetch();
    queryClient.resetQueries();
    toast.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>
              {userData?.data?.name.charAt(0)}
              {userData?.data?.name.charAt(userData?.data?.name.length - 1)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userData?.data?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData?.data?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <div className="flex justify-start items-center space-x-2">
              <RotateCw size={20}/>
              <h3> Change Password</h3>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <div className="flex justify-start items-center space-x-2">
            <LogoutIcon size={20} />
            <h3> Log out</h3>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
