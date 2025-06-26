"use client";
import logoHorizontal from "..@/public/placeholder.png";
import logoSmall from "..@/public/placeholder.png";
import { cn } from "@/lib/utils";
import { ChevronUp, LogOut, TriangleAlert, User2 } from "lucide-react";

import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeSwitch from "../theme-switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { adminNav } from "@/constants";

export default function AdminDashboardSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader
        className={cn(
          "relative h-16 overflow-hidden",
          state === "expanded" && "mb-5",
        )}
      >
        <div className="absolute inset-0 flex items-center transition-opacity duration-300 ease-in-out">
          <Image
            src={logoHorizontal}
            alt=""
            className={cn(
              "w-2/3 transition-opacity duration-300 ease-in-out",
              state === "expanded" ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out">
          <Image
            src={logoSmall}
            alt=""
            className={cn(
              "h-8 w-auto transition-opacity duration-300 ease-in-out",
              state === "expanded" ? "opacity-0" : "opacity-100",
            )}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {adminNav.map((group) => (
          <SidebarGroup key={group.title}>
            {group.title && (
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={pathname === item.url}
                      tooltip={item.title}
                      asChild
                    >
                      <a href={item.url}>
                        <item.icon className="mr-2 size-7 group-hover/menu-button:text-primary" />
                        <span>{item.title}</span>
                        {item.title === "Commandes" && (
                          <SidebarMenuBadge>{ordersNumber}</SidebarMenuBadge>
                        )}
                        {item.title === "Vue globale stock" && stockAlert && (
                          <SidebarMenuBadge>
                            <TriangleAlert
                              className={cn(alertColor, "size-5")}
                            />
                          </SidebarMenuBadge>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  test test
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top">
                <ThemeSwitch />
                <DropdownMenuItem
                  className="mt-1"
                  onSelect={() => {
                    console.log("logout");
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <LogOut className="size-4" />
                    Déconnexion
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
