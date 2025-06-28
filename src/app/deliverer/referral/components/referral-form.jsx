"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, Gift } from "lucide-react";

const ReferralForm = () => {
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    referrerPhone: "",
    refereeName: "",
    refereeEmail: "",
    refereePhone: "",
    relationship: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.referrerName.trim())
      newErrors.referrerName = "Votre nom est requis";
    if (!formData.referrerEmail.trim())
      newErrors.referrerEmail = "Votre email est requis";
    if (!formData.referrerPhone.trim())
      newErrors.referrerPhone = "Votre numéro de téléphone est requis";
    if (!formData.refereeName.trim())
      newErrors.refereeName = "Le nom du parrainé est requis";
    if (!formData.refereeEmail.trim())
      newErrors.refereeEmail = "L'email du parrainé est requis";
    if (!formData.refereePhone.trim())
      newErrors.refereePhone = "Le numéro de téléphone du parrainé est requis";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.referrerEmail && !emailRegex.test(formData.referrerEmail)) {
      newErrors.referrerEmail = "Veuillez entrer une adresse email valide";
    }
    if (formData.refereeEmail && !emailRegex.test(formData.refereeEmail)) {
      newErrors.refereeEmail = "Veuillez entrer une adresse email valide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      referrerName: "",
      referrerEmail: "",
      referrerPhone: "",
      refereeName: "",
      refereeEmail: "",
      refereePhone: "",
      relationship: "",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto p-6">
        <Card className="text-center">
          <CardHeader>
            <div className="mb-4 flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-700">
              Parrainage soumis avec succès !
            </CardTitle>
            <CardDescription className="text-lg">
              Merci d'avoir parrainé {formData.refereeName}. Nous le
              contacterons bientôt !
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 rounded-lg bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-800">
                Que se passe-t-il ensuite ?
              </h3>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Nous contacterons {formData.refereeName} sous 24h</li>
                <li>
                  • Il/elle recevra des informations pour rejoindre notre équipe
                  de livraison
                </li>
                <li>
                  • Vous recevrez votre prime de parrainage dès qu'il/elle aura
                  effectué ses 10 premières livraisons
                </li>
              </ul>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Gift className="mr-1 h-4 w-4" />
              Prime de parrainage : 50€
            </Badge>
          </CardContent>
          <CardFooter>
            <Button onClick={resetForm} className="w-full">
              Parrainer une autre personne
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <User className="h-6 w-6" />
            Programme de Parrainage Livraison
          </CardTitle>
          <CardDescription>
            Parrainez un ami pour rejoindre notre équipe de livraison et gagnez
            50€ lorsqu'il/elle effectue ses 10 premières livraisons !
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Referrer Information */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-semibold text-gray-800">
              Vos informations
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="referrerName">Votre nom *</Label>
                <Input
                  id="referrerName"
                  value={formData.referrerName}
                  onChange={(e) =>
                    handleInputChange("referrerName", e.target.value)
                  }
                  className={errors.referrerName ? "border-red-500" : ""}
                  placeholder="Entrez votre nom complet"
                />
                {errors.referrerName && (
                  <p className="text-sm text-red-500">{errors.referrerName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="referrerEmail">Votre email *</Label>
                <Input
                  id="referrerEmail"
                  type="email"
                  value={formData.referrerEmail}
                  onChange={(e) =>
                    handleInputChange("referrerEmail", e.target.value)
                  }
                  className={errors.referrerEmail ? "border-red-500" : ""}
                  placeholder="votre.email@exemple.com"
                />
                {errors.referrerEmail && (
                  <p className="text-sm text-red-500">{errors.referrerEmail}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referrerPhone">Votre numéro de téléphone *</Label>
              <Input
                id="referrerPhone"
                type="tel"
                value={formData.referrerPhone}
                onChange={(e) =>
                  handleInputChange("referrerPhone", e.target.value)
                }
                className={errors.referrerPhone ? "border-red-500" : ""}
                placeholder="(06) 12 34 56 78"
              />
              {errors.referrerPhone && (
                <p className="text-sm text-red-500">{errors.referrerPhone}</p>
              )}
            </div>
          </div>

          {/* Referee Information */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-semibold text-gray-800">
              Personne que vous parrainez
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="refereeName">Son nom *</Label>
                <Input
                  id="refereeName"
                  value={formData.refereeName}
                  onChange={(e) =>
                    handleInputChange("refereeName", e.target.value)
                  }
                  className={errors.refereeName ? "border-red-500" : ""}
                  placeholder="Entrez son nom complet"
                />
                {errors.refereeName && (
                  <p className="text-sm text-red-500">{errors.refereeName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="refereeEmail">Son email *</Label>
                <Input
                  id="refereeEmail"
                  type="email"
                  value={formData.refereeEmail}
                  onChange={(e) =>
                    handleInputChange("refereeEmail", e.target.value)
                  }
                  className={errors.refereeEmail ? "border-red-500" : ""}
                  placeholder="son.email@exemple.com"
                />
                {errors.refereeEmail && (
                  <p className="text-sm text-red-500">{errors.refereeEmail}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="refereePhone">Son numéro de téléphone *</Label>
                <Input
                  id="refereePhone"
                  type="tel"
                  value={formData.refereePhone}
                  onChange={(e) =>
                    handleInputChange("refereePhone", e.target.value)
                  }
                  className={errors.refereePhone ? "border-red-500" : ""}
                  placeholder="(06) 12 34 56 78"
                />
                {errors.refereePhone && (
                  <p className="text-sm text-red-500">{errors.refereePhone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship">Relation (optionnel)</Label>
                <Input
                  id="relationship"
                  value={formData.relationship}
                  onChange={(e) =>
                    handleInputChange("relationship", e.target.value)
                  }
                  placeholder="Ami, Famille, Collègue, etc."
                />
              </div>
            </div>
          </div>

          {/* Additional Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message additionnel (optionnel)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Dites-nous pourquoi cette personne serait un atout pour notre équipe de livraison..."
              rows={4}
            />
          </div>

          <Alert>
            <Gift className="h-4 w-4" />
            <AlertDescription>
              <strong>Prime de parrainage :</strong> Vous recevrez 50€ dès que
              votre filleul aura effectué ses 10 premières livraisons. Vous et
              votre filleul serez informés lorsque la prime sera gagnée !
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi du parrainage..." : "Envoyer le parrainage"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReferralForm;
