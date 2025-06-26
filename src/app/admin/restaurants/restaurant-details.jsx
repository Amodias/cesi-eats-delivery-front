import { DataTable } from "@/components/table/data-table";
import { orderHistoryColumns } from "./order-history-columns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { scores } from "@/constants";
import { cn, formatPrice } from "@/lib/utils";
import {
  CircleCheck,
  CircleX,
  User,
  Mail,
  Phone,
  MapPin,
  BadgeX,
  Store,
  Star,
  Banknote,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function RestaurantDetails({
  restaurant = {
    id: 0,
    firstName: "TEST",
    lastName: "TEST",
    phoneNumber: "0123456789",
    email: "email@test.com",
    address: "123 Test St, Test City",
    referralCode: "TEST123",
    referralPoints: 9999,
    rating: 5,
    totalGained: 1000,
    ordersCount: 10,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
}) {
  const [orders, setOrders] = useState([
    {
      id: 1,
      products: [
        { id: 1, name: "Product 1", quantity: 2, price: 500 },
        { id: 2, name: "Product 2", quantity: 1, price: 500 },
      ],
      distance: "10 km",
      shippingAmount: 500,
      createdAt: "2023-01-01T00:00:00Z",
    },
  ]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRestaurantOrders() {
      // return;
      try {
        const response = await fetch("/dashboard/restaurant/api/stats", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: JSON.stringify({ id: restaurant.id }),
        });
        const responseData = await response.json();
        if (!responseData.success) return;
        setOrders(responseData.orders);
        setStats(responseData.stats);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }
    // fetchRestaurantOrders();
  }, [restaurant]);

  if (loading) return;

  return (
    <div className="h-full rounded-lg border-gray-200 bg-white p-5 shadow-md">
      <div className="mb-6 grid grid-cols-3 gap-2.5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              Note
            </CardTitle>
            <Star className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              Livraisons achevées
            </CardTitle>
            <CircleCheck className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{restaurant.ordersCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              Total gagné
            </CardTitle>
            <Banknote className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(restaurant.totalGained)}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mb-5">
        <div className="flex items-center gap-5">
          <h3 className="flex items-center text-2xl font-semibold text-gray-800">
            Informations du restaurant
          </h3>
          {restaurant.is_active === 0 && (
            <Badge variant="destructive">
              <BadgeX className="mr-1.5 size-4" /> Inactif
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <InfoItem
            icon={<User className="size-5 text-gray-500" />}
            label="Nom"
            value={`${restaurant.firstName} ${restaurant.lastName}`}
          />
          <InfoItem
            icon={<Mail className="size-5 text-gray-500" />}
            label="Email"
            value={restaurant.email}
          />
          <InfoItem
            icon={<Phone className="size-5 text-gray-500" />}
            label="Téléphone"
            value={restaurant.phoneNumber}
          />
          <InfoItem
            icon={<MapPin className="size-5 text-gray-500" />}
            label="Adresse"
            value={restaurant.address}
          />
        </div>
      </div>
      <DataTable
        columns={orderHistoryColumns}
        data={orders}
        page="adminRestaurant"
      />
    </div>
  );
}
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start">
      <div className="mt-1 flex-shrink-0">{icon}</div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-sm text-gray-900">{value}</p>
      </div>
    </div>
  );
}
