import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  MapPin,
  Phone,
  Calendar,
  Shield,
  Car,
  Gift,
  Star,
  Eye,
  EyeOff,
  Copy,
  Check,
} from "lucide-react";
import { DelivererForm } from ".";

export default function DelivererCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState("");
  const [open, setOpen] = useState(false);
  // Sample deliverer data
  const deliverer = {
    firstName: "Ahmed",
    lastName: "Benali",
    address: "15 Rue des Martyrs, Oran 31000",
    phoneNumber: "+213 555 123 456",
    birthDate: "1990-03-15",
    password: "SecurePass123!",
    nationalID: "1234567890123",
    vehiculeID: "OR-123-AB",
    profilePicture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    referralCode: "DELIVER2024",
    referredPoints: 1250,
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPointsBadgeColor = (points) => {
    if (points >= 1000) return "bg-green-500";
    if (points >= 500) return "bg-blue-500";
    return "bg-gray-500";
  };

  return (
    <>
      <Card className="w-full shadow-lg dark:bg-zinc-900">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={deliverer.profilePicture}
                alt="Profile"
                className="h-20 w-20 rounded-full border-4 border-blue-100 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500">
                <div className="h-2 w-2 rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-gray-800">
                {deliverer.firstName} {deliverer.lastName}
              </CardTitle>
              <Badge variant="secondary" className="mt-1">
                Livreur Actif
              </Badge>
            </div>
            <div className="text-right">
              <div
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white ${getPointsBadgeColor(deliverer.referredPoints)}`}
              >
                <Star className="mr-1 h-4 w-4" />
                {deliverer.referredPoints} pts
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Contact Information */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Téléphone</p>
                  <p className="truncate text-sm text-gray-600">
                    {deliverer.phoneNumber}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(deliverer.phoneNumber, "phone")
                  }
                  className="flex-shrink-0"
                >
                  {copiedField === "phone" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="flex items-start space-x-3 rounded-lg bg-gray-50 p-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Adresse</p>
                  <p className="text-sm text-gray-600">{deliverer.address}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(deliverer.address, "address")}
                  className="flex-shrink-0"
                >
                  {copiedField === "address" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                <Calendar className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Date de naissance
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(deliverer.birthDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                <Car className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Véhicule</p>
                  <p className="font-mono text-sm text-gray-600">
                    {deliverer.vehiculeID}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(deliverer.vehiculeID, "vehicle")
                  }
                  className="flex-shrink-0"
                >
                  {copiedField === "vehicle" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Security Information */}
          <div className="border-t pt-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
              Informations de sécurité
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-3 rounded-lg bg-red-50 p-3">
                <Shield className="h-5 w-5 flex-shrink-0 text-red-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    ID National
                  </p>
                  <p className="font-mono text-sm text-gray-600">
                    {deliverer.nationalID}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(deliverer.nationalID, "nationalID")
                  }
                  className="flex-shrink-0"
                >
                  {copiedField === "nationalID" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="flex items-center space-x-3 rounded-lg bg-red-50 p-3">
                <User className="h-5 w-5 flex-shrink-0 text-red-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Mot de passe
                  </p>
                  <p className="font-mono text-sm text-gray-600">
                    {showPassword ? deliverer.password : "••••••••••••"}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex-shrink-0"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(deliverer.password, "password")
                    }
                    className="flex-shrink-0"
                  >
                    {copiedField === "password" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Information */}
          <div className="border-t pt-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
              Programme de parrainage
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-3 rounded-lg bg-green-50 p-3">
                <Gift className="h-5 w-5 flex-shrink-0 text-green-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Code de parrainage
                  </p>
                  <p className="font-mono text-sm font-bold text-green-600">
                    {deliverer.referralCode}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(deliverer.referralCode, "referral")
                  }
                  className="flex-shrink-0"
                >
                  {copiedField === "referral" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center rounded-lg bg-green-50 p-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {deliverer.referredPoints}
                  </p>
                  <p className="text-sm text-gray-600">Points de parrainage</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 border-t pt-4">
            <Button
              className="flex-1"
              variant="default"
              onClick={() => setOpen(true)}
            >
              Modifier le profil
            </Button>
            <DelivererForm
              open={open}
              setOpen={setOpen}
              data={deliverer}
              children={<></>}
            />
            <Button className="flex-1" variant="outline">
              Historique des livraisons
            </Button>
            <Button variant="outline" size="sm">
              Désactiver
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
