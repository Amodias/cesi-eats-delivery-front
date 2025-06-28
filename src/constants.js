import {
  Truck,
  FolderTree,
  BriefcaseBusiness,
  ChartColumnStacked,
  ClipboardList,
  Home,
  Megaphone,
  PackageX,
  ShoppingBag,
  ShoppingCart,
  Users,
  Bike,
  ChefHat,
  UserSquare,
  ShieldUser,
  Vegan,
  WheatOff,
  Leaf,
} from "lucide-react";

//! Navigation
export const adminNav = [
  {
    title: "",
    items: [
      {
        icon: Home,
        title: "Dashboard",
        url: "/admin/dashboard",
        permissions: ["admin"],
      },
      {
        icon: Users,
        title: "Clients",
        url: "/admin/clients",
        permissions: ["admin"],
      },
      {
        icon: Bike,
        title: "Livreurs",
        url: "/admin/delivery",
        permissions: ["admin"],
      },
      {
        icon: ChefHat,
        title: "Restaurant",
        url: "/admin/restaurants",
        permissions: ["admin"],
      },
      {
        icon: ShieldUser,
        title: "Comptes Administateurs",
        url: "/admin/accounts",
        permissions: ["admin"],
      },
      {
        icon: UserSquare,
        title: "Mon profil",
        url: "/admin/profile",
        permissions: ["admin"],
      },
    ],
  },
];
export const deliveryNav = [
  {
    title: "",
    items: [
      {
        icon: Home,
        title: "Dashboard",
        url: "/deliverer/home",
        permissions: ["deliverer"],
      },
      {
        icon: UserSquare,
        title: "Gestion du compte",
        url: "/deliverer/account",
        permissions: ["deliverer"],
      },
      {
        icon: ClipboardList,
        title: "Gestion des commandes",
        url: "/deliverer/orders",
        permissions: ["deliverer"],
      },
      {
        icon: Megaphone,
        title: "Notifications",
        url: "/deliverer/notifications",
        permissions: ["deliverer"],
      },
      {
        icon: Users,
        title: "Parrainage d'un livreur",
        url: "/deliverer/referral",
        permissions: ["deliverer"],
      },
    ],
  },
];
export const clientNav = [
  {
    title: "",
    items: [
      {
        icon: Home,
        title: "Accueil",
        url: "/client/accueil",
        permissions: ["client"],
      },
      {
        icon: Bike,
        title: "Historique",
        url: "/client/order-history",
        permissions: ["client"],
      },
      {
        icon: UserSquare,
        title: "Mon profil",
        url: "/client/profile",
        permissions: ["client"],
      },
    ],
  },
];

//! Authentication
export const registerTypes = [
  {
    id: "client",
    name: "Client",
    description: "Commander des repas et profiter de la livraison à domicile.",
    icon: "👤",
    path: "/auth/register/client",
  },
  {
    id: "delivery",
    name: "Livreur",
    description: "Livrer des commandes et gagner de l'argent.",
    icon: "🛵",
    path: "/auth/register/client",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    description: "Rejoindre la plateforme et proposer vos plats.",
    icon: "🍽️",
    path: "/auth/register/client",
  },
];
export const userRoles = ["admin", "client", "deliverer", "restaurant"];

//! Restaurants
export const restaurantLabel = [
  {
    id: "vegan",
    name: "Végan",
    icon: Vegan,
    colors: {
      text: "text-green-500",
      bg: "bg-green-50 dark:bg-green-500/20",
      border: "border-green-500",
    },
  },
  {
    id: "gluten",
    name: "Sans Gluten",
    icon: WheatOff,
    colors: {
      text: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-500/20",
      border: "border-orange-500",
    },
  },
  {
    id: "halal",
    name: "Halal",
    icon: BriefcaseBusiness,
    colors: {
      text: "text-red-500",
      bg: "bg-red-50 dark:bg-red-500/20",
      border: "border-red-500",
    },
  },
  {
    id: "organic",
    name: "Bio",
    icon: Leaf,
    colors: {
      text: "text-teal-500",
      bg: "bg-teal-50 dark:bg-teal-500/20",
      border: "border-teal-500",
    },
  },
];
export const restaurantPricing = [
  {
    id: "$",
    name: "low-cost",
    icon: ShoppingCart,
    colors: {
      text: "text-green-500",
      bg: "bg-green-50 dark:bg-green-500/20",
      border: "border-green-500",
    },
  },
  {
    id: "$$",
    name: "Abordable",
    icon: ShoppingBag,
    colors: {
      text: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/20",
      border: "border-blue-500",
    },
  },
  {
    id: "$$$",
    name: "Cher",
    icon: PackageX,
    colors: {
      text: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-500/20",
      border: "border-orange-500",
    },
  },
  {
    id: "$$$$",
    name: "Luxe",
    icon: PackageX,
    colors: {
      text: "text-red-500",
      bg: "bg-red-50 dark:bg-red-500/20",
      border: "border-red-500",
    },
  },
];
export const restaurantCategories = [
  "Fast-food",
  "Pizzeria",
  "Café",
  "Boulangerie",
  "Traiteur",
  "Snack",
  "Asiatique",
  "Indien",
  "Poisson",
  "Thailandais",
  "Italien",
  "Chinois",
  "Mexicain",
  "Vietnamien",
  "Turc",
  "Libanais",
  "Africain",
];

export const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
