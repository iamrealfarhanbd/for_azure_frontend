import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuthStore } from "@/store/auth-store";
import { FaUserAstronaut } from "react-icons/fa6";
import { Link } from "react-router-dom";
import React from "react";
import { useToast } from "@/hooks/use-toast";

function CustomNavigationMenu() {
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const { toast } = useToast();

  const [loggedOut, setLoggedOut] = React.useState(false);

  // UseEffect to handle side effects after state changes
  React.useEffect(() => {
    if (loggedOut) {
      toast({
        variant: "default",
        title: "Logout Successful",
        description: "You have successfully logged out.",
      });
      setLoggedOut(false); // Reset the state to prevent repeated toasts
    }
  }, [loggedOut, toast]);

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <FaUserAstronaut className="text-[22px]" />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white font-roboto p-1.5">
              {isLoggedIn && (
                <Link to="/profile">
                  <div className="w-[100px] lg:w-[150px] p-2.5 rounded-md hover:bg-slate-100 text-[16px] font-medium cursor-pointer">
                    Profile
                  </div>
                </Link>
              )}
              {/* <Link to="/settings">
                <div className="w-[100px] lg:w-[150px] p-2.5 rounded-md hover:bg-slate-100 text-[16px] font-medium cursor-pointer">
                  Settings
                </div>
              </Link> */}
              <div
                onClick={() => {
                  logout(); // Log the user out
                  setLoggedOut(true); // Trigger the toast
                }}
              >
                {isLoggedIn ? (
                  <div className="w-[100px] lg:w-[150px] p-2.5 rounded-md hover:bg-slate-100 text-[16px] font-medium cursor-pointer">
                    Logout
                  </div>
                ) : (
                  <div className="w-full flex flex-col">
                    <Link
                      to="/auth/register"
                      className="w-[100px] lg:w-[150px] p-2.5 rounded-md hover:bg-slate-100 text-[16px] font-medium cursor-pointer"
                    >
                      Register
                    </Link>
                    <Link
                      to="/auth/login"
                      className="w-[100px] lg:w-[150px] p-2.5 rounded-md hover:bg-slate-100 text-[16px] font-medium cursor-pointer"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default CustomNavigationMenu;
