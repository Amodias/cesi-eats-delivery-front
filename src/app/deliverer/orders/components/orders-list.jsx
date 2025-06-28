"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// Custom table components since shadcn table is not available
import {
  RefreshCw,
  MapPin,
  Store,
  User,
  Clock,
  DollarSign,
  Package,
  Loader2,
  AlertCircle,
} from "lucide-react";
import OrderActions from "./order-action";
import { getCookie } from "@/lib/cookies";

// 4
const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Mock API functions - replace with actual API calls
  const fetchAvailableOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:4004/orders/deliverer/available",
        {
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${getCookie("token")}`,
          },
          credentials: "include", // pour envoyer le refreshToken en cookie
        },
      );
      const data = await response.json();

      console.log(data);

      // Mock data for demonstration
      const mockOrders = [
        {
          _id: "1",
          clientID: { _id: "c1", firstName: "Ahmed", lastName: "Benali" },
          restaurentID: { _id: "r1", name: "Pizza Palace" },
          delivererID: null,
          items: [
            { articleID: { name: "Pizza Margherita" }, quantity: 2 },
            { articleID: { name: "Coca Cola" }, quantity: 1 },
          ],
          totalPrice: 2500,
          status: "ready",
          deliveryAddress: "15 Rue des Martyrs, Oran",
          paymentStatus: "completed",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          _id: "2",
          clientID: { _id: "c2", firstName: "Fatima", lastName: "Zahra" },
          restaurentID: { _id: "r2", name: "Burger House" },
          delivererID: "current_deliverer_id",
          items: [
            { articleID: { name: "Burger Deluxe" }, quantity: 1 },
            { articleID: { name: "Frites" }, quantity: 1 },
          ],
          totalPrice: 1800,
          status: "in_delivery",
          deliveryAddress: "42 Avenue de la République, Oran",
          paymentStatus: "completed",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      return data.data || mockOrders;
    } catch (error) {
      throw new Error("Erreur lors du chargement des commandes");
    }
  };

  const acceptOrder = async (orderId) => {
    try {
      // Replace with actual API call
      const response = await fetch(
        `http://localhost:4004/orders/${orderId}/accept`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${getCookie("token")}`,
          },
          credentials: "include", // pour envoyer le refreshToken en cookie
        },
      );

      // Mock success
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: "in_delivery",
                delivererID: "current_deliverer_id",
              }
            : order,
        ),
      );

      console.log("Commande acceptée avec succès");
    } catch (error) {
      throw new Error("Erreur lors de l'acceptation de la commande");
    }
  };

  const markDelivered = async (orderId) => {
    try {
      // Replace with actual API call
      const response = await fetch(
        `http://localhost:4004/orders/${orderId}/deliver`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${getCookie("token")}`,
          },
          credentials: "include", // pour envoyer le refreshToken en cookie
        },
      );

      // Mock success
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "delivered" } : order,
        ),
      );

      console.log("Commande marquée comme livrée");
    } catch (error) {
      throw new Error("Erreur lors de la mise à jour de la commande");
    }
  };

  const loadOrders = async () => {
    try {
      setError(null);
      const data = await fetchAvailableOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadOrders();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getItemsPreview = (items) => {
    if (!items || items.length === 0) return "Aucun article";

    const preview = items
      .slice(0, 2)
      .map((item) => {
        const name = item.articleID?.name || item.packID?.name || "Article";
        return `${name} (${item.quantity})`;
      })
      .join(", ");

    return items.length > 2 ? `${preview}...` : preview;
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          Chargement des commandes...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <p className="mb-4 text-red-600">{error}</p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Réessayer
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Commandes disponibles
          </CardTitle>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={refreshing}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Actualiser
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          {orders.length} commande(s) trouvée(s)
        </p>
      </CardHeader>

      <CardContent>
        {orders.length === 0 ? (
          <div className="py-8 text-center">
            <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-600">Aucune commande disponible</p>
          </div>
        ) : (
          <div className="max-w-full overflow-x-auto">
            <table className="w-full border-collapse rounded-lg border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-[100px] border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                    ID
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Client
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Restaurant
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Articles
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Prix
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Adresse
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Paiement
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-mono text-sm">
                      #{order._id.slice(-6)}
                    </td>

                    <td className="border border-gray-200 px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">
                            {order.clientID?.firstName}{" "}
                            {order.clientID?.lastName}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="border border-gray-200 px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Store className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">
                          {order.restaurentID?.name}
                        </span>
                      </div>
                    </td>

                    <td className="border border-gray-200 px-4 py-3">
                      <div className="max-w-xs">
                        <p className="truncate text-sm text-gray-600">
                          {getItemsPreview(order.items)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {order.items?.length} article(s)
                        </p>
                      </div>
                    </td>

                    <td className="border border-gray-200 px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-600">
                          {formatPrice(order.totalPrice)}
                        </span>
                      </div>
                    </td>

                    <td className="border border-gray-200 px-4 py-3">
                      <div className="flex max-w-xs items-start space-x-2">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {order.deliveryAddress}
                        </span>
                      </div>
                    </td>

                    <td className="border border-gray-200 px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </td>

                    <td className="border border-gray-200 px-4 py-3">
                      <Badge
                        variant={
                          order.paymentStatus === "completed"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          order.paymentStatus === "completed"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                      >
                        {order.paymentStatus === "completed"
                          ? "Payé"
                          : order.paymentStatus === "pending"
                            ? "En attente"
                            : "Échoué"}
                      </Badge>
                    </td>

                    <td className="border border-gray-200 px-4 py-3">
                      <OrderActions
                        order={order}
                        onAcceptOrder={acceptOrder}
                        onMarkDelivered={markDelivered}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersList;
