"use client";
import { cn } from "@/lib/utils";

const NotificationCard = ({ notification, onClick }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case "order":
        return "bg-blue-50 border-blue-200";
      case "delivery":
        return "bg-green-50 border-green-200";
      case "alert":
        return "bg-red-50 border-red-200";
      case "update":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div
      className={cn(
        "cursor-pointer rounded-lg border p-4 transition-colors hover:bg-gray-50",
        getTypeColor(notification.type),
        !notification.read && "border-l-4 border-l-blue-500",
      )}
      onClick={() => onClick(notification)}
    >
      <div className="mb-2 flex items-start justify-between">
        <h4
          className={cn(
            "text-sm font-medium",
            !notification.read && "font-semibold",
          )}
        >
          {notification.title}
        </h4>
        <span className="text-xs text-gray-500">{notification.timestamp}</span>
      </div>
      <p className="line-clamp-2 text-sm text-gray-600">
        {notification.message}
      </p>
      {!notification.read && (
        <div className="mt-2">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
