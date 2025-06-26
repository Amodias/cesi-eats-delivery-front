"use client";

import logoHorizontal from "..@/public/placeholder.png";
import logoSmall from "..@/public/placeholder.png";
import { cn } from "@/lib/utils";
import {
  ChevronUp,
  LogOut,
  Megaphone,
  TriangleAlert,
  User2,
} from "lucide-react";

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
import { deliveryNav } from "@/constants";
import NotificationCard from "./notification-card";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const mockNotifications = [
  {
    id: 1,
    title: "Nouvelle commande",
    message:
      "Une nouvelle commande #1234 a été assignée à votre zone de livraison.",
    timestamp: "Il y a 5 minutes",
    read: false,
    type: "order",
  },
  {
    id: 2,
    title: "Livraison terminée",
    message:
      "La commande #1230 a été livrée avec succès à l'adresse 123 Rue de la Paix.",
    timestamp: "Il y a 15 minutes",
    read: true,
    type: "delivery",
  },
  {
    id: 3,
    title: "Alerte stock",
    message:
      "Le stock de produits frais est faible dans votre zone. Veuillez vous réapprovisionner.",
    timestamp: "Il y a 30 minutes",
    read: false,
    type: "alert",
  },
  {
    id: 4,
    title: "Mise à jour itinéraire",
    message:
      "Votre itinéraire de livraison a été optimisé pour les prochaines commandes.",
    timestamp: "Il y a 1 heure",
    read: true,
    type: "update",
  },
];

export default function DeliverySidebar({ navItems = deliveryNav }) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [isNotificationSheetOpen, setIsNotificationSheetOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleNotificationClick = (notification) => {
    // Mark notification as read when clicked
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMenuItemClick = (item) => {
    if (item.title === "Notifications") {
      setIsNotificationSheetOpen(true);
    } else {
      // Navigate to other pages normally
      window.location.href = item.url;
    }
  };

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
        {navItems.map((group) => (
          <SidebarGroup key={group.title}>
            {group.title && (
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.title === "Notifications" ? (
                      <SidebarMenuButton
                        isActive={pathname === item.url}
                        tooltip={item.title}
                        onClick={() => handleMenuItemClick(item)}
                      >
                        <item.icon className="mr-2 size-7 group-hover/menu-button:text-primary" />
                        <span>{item.title}</span>
                        {unreadCount > 0 && (
                          <SidebarMenuBadge>{unreadCount}</SidebarMenuBadge>
                        )}
                      </SidebarMenuButton>
                    ) : (
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
                    )}
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

      {/* Notification Sheet */}
      <Sheet
        open={isNotificationSheetOpen}
        onOpenChange={setIsNotificationSheetOpen}
      >
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Megaphone className="size-5" />
              Notifications
            </SheetTitle>
            <SheetDescription>
              Restez informé de vos livraisons et alertes importantes
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 max-h-[calc(100vh-120px)] space-y-4 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onClick={handleNotificationClick}
                />
              ))
            ) : (
              <div className="py-8 text-center text-gray-500">
                <Megaphone className="mx-auto mb-3 size-12 text-gray-300" />
                <p>Aucune notification pour le moment</p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </Sidebar>
  );
}
