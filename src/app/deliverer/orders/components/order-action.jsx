const OrderAction = () => {};
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Truck, Clock, AlertCircle, Loader2 } from "lucide-react";

const OrderActions = ({ order, onAcceptOrder, onMarkDelivered }) => {
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [deliverLoading, setDeliverLoading] = useState(false);

  const handleAcceptOrder = async () => {
    setAcceptLoading(true);
    try {
      await onAcceptOrder(order._id);
    } catch (error) {
      console.error("Error accepting order:", error);
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleMarkDelivered = async () => {
    setDeliverLoading(true);
    try {
      await onMarkDelivered(order._id);
    } catch (error) {
      console.error("Error marking as delivered:", error);
    } finally {
      setDeliverLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-500", icon: Clock, text: "En attente" },
      confirmed: { color: "bg-blue-500", icon: Check, text: "Confirmé" },
      preparing: {
        color: "bg-orange-500",
        icon: Clock,
        text: "En préparation",
      },
      ready: { color: "bg-green-500", icon: Check, text: "Prêt" },
      in_delivery: {
        color: "bg-purple-500",
        icon: Truck,
        text: "En livraison",
      },
      delivered: { color: "bg-green-600", icon: Check, text: "Livré" },
      cancelled: { color: "bg-red-500", icon: AlertCircle, text: "Annulé" },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1 text-white`}>
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const canAccept = order.status === "ready" && !order.delivererID;
  const canMarkDelivered = order.status === "in_delivery" && order.delivererID;

  return (
    <div className="flex min-w-fit flex-col gap-2">
      {/* Status Badge */}
      <div className="flex justify-center">{getStatusBadge(order.status)}</div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {canAccept && (
          <Button
            size="sm"
            onClick={handleAcceptOrder}
            disabled={acceptLoading}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            {acceptLoading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Accepter...
              </>
            ) : (
              <>
                <Check className="mr-1 h-4 w-4" />
                Accepter
              </>
            )}
          </Button>
        )}

        {canMarkDelivered && (
          <Button
            size="sm"
            onClick={handleMarkDelivered}
            disabled={deliverLoading}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            {deliverLoading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Livraison...
              </>
            ) : (
              <>
                <Truck className="mr-1 h-4 w-4" />
                Marquer livré
              </>
            )}
          </Button>
        )}

        {!canAccept && !canMarkDelivered && (
          <div className="py-2 text-center text-xs text-gray-500">
            Aucune action disponible
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderActions;
