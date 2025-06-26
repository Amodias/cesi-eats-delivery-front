"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export default function DeliveryWelcome() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const delivererData = {
    name: "Alex Johnson",
    rating: 4.8,
    totalDeliveries: 1247,
    todayEarnings: 127.5,
    weeklyEarnings: 623.75,
    pendingDeliveries: 3,
    completedToday: 12,
    level: "Gold",
    zone: "Downtown District",
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="mx-auto space-y-6">
      {/* Header Section */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {delivererData.name}! 👋
            </h1>
            <p className="mt-1 text-gray-600">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Active in {delivererData.zone}
              </span>
              <Badge variant="secondary" className="ml-2">
                {delivererData.level} Driver
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-600">Status</p>
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
                ></div>
                <span className="font-medium">
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
            <Button
              onClick={toggleOnlineStatus}
              variant={isOnline ? "destructive" : "default"}
              className="min-w-[100px]"
            >
              {isOnline ? "Go Offline" : "Go Online"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
