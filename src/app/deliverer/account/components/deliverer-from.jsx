"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { toast } from "sonner";
import { getCookie } from "@/lib/cookies";
import { apiFetch } from "@/lib/api-wrapper";

export default function DelivererForm({ children, data, open, setOpen }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      firstName: data.firstName ?? " ",
      lastName: data.lastName ?? " ",
      address: data.address ?? " ",
      phoneNumber: data.phoneNumber ?? " ",
      birthDate: data.birthDate ?? " ",
      nationalID: data.nationalID ?? " ",
      vehiculeID: data.vehiculeID ?? " ",
      profilePicture: data.profilePicture ?? " ",
      referralCode: data.referralCode ?? " ",
      referredPoints: data.referredPoints ?? " ",
    },
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const values = form.getValues();
      const token = getCookie("token");

      const response = await fetch(`http://localhost:4001/deliverers/current`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      let responseData = await response.json();
      if (response.ok) {
        if (responseData.success) toast.success("Modifié avec succès");
        else toast.error("Une erreur s'est produite");

        setOpen(false);
      }
    } catch (error) {
      console.log();

      toast.error("Une erreur s'est produite", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {!data && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent className="w-full" side="right">
        <SheetHeader>
          <SheetTitle>{data ? "Modifier" : "Ajouter"} un livreur</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 p-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Prénom */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom *</FormLabel>
                    <FormControl>
                      <Input placeholder="Prénom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nom */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Adresse */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse *</FormLabel>
                    <FormControl>
                      <Input placeholder="Adresse complète" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Téléphone */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de téléphone *</FormLabel>
                    <FormControl>
                      <Input placeholder="0X XX XX XX XX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date de naissance */}
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de naissance *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Numéro de carte d'identité */}
              <FormField
                control={form.control}
                name="nationalID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de carte d'identité *</FormLabel>
                    <FormControl>
                      <Input placeholder="Numéro de CIN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Matricule du véhicule */}
              <FormField
                control={form.control}
                name="vehiculeID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matricule du véhicule *</FormLabel>
                    <FormControl>
                      <Input placeholder="1234-AB-56" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Photo de profil */}
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo de profil</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=" Photo de profil (optionnel)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Code de parrainage */}
              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code de parrainage</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Code de parrainage (optionnel)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bouton de soumission */}
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                size="lg"
                className="mt-4"
              >
                Modifier le livreur
              </Button>
            </form>
          </Form>
        </div>
        <SheetClose asChild></SheetClose>
      </SheetContent>
    </Sheet>
  );
}
