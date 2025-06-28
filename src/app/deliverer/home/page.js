"use client";
import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DelivererProvider, { useDeliverer } from "../context/deliverer-provider";

const DeliveryWelcome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(false);
  const deliverer = useDeliverer();

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
              Welcome back, {deliverer.firstName} {deliverer.lastName}! 👋
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
                Phone: {deliverer.phoneNumber}
              </span>
              <Badge variant="secondary" className="ml-2">
                Vehicule: {deliverer.vehiculeID}
              </Badge>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="outline">Birth: {deliverer.birthDate}</Badge>
              <Badge variant="outline">
                National ID: {deliverer.nationalID}
              </Badge>
              <Badge variant="outline">
                Referral: {deliverer.referralCode}
              </Badge>
              <Badge variant="outline">
                Points: {deliverer.referredPoints}
              </Badge>
              <Badge variant="outline">Joined: {deliverer.createdAt}</Badge>
            </div>
            {deliverer.profilePicture && (
              <img
                src={deliverer.profilePicture}
                alt="Profile"
                className="mt-4 h-16 w-16 rounded-full border object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DelivererHomePage() {
  return (
    <DelivererProvider>
      <DeliveryWelcome />
    </DelivererProvider>
  );
}
