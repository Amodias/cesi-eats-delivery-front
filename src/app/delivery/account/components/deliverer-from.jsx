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

import { clientsFormSchema } from "@/schemas/client-schema";
import { toast } from "sonner";

export default function DelivererForm({ children, data, open, setOpen }) {
  const [isUpdate, setIsUpdate] = useState(data !== undefined);
  const form = useForm({
    resolver: zodResolver(clientsFormSchema),
    defaultValues: {
      firstName: data?.firstName ?? "",
      lastName: data?.lastName ?? "",
      email: data?.email ?? "",
      phone: data?.phone ?? "",
      password: "",
      type: "user",
    },
    shouldUnregister: true,
  });

  const handleCreation = async (values) => {
    const response = await fetch("http://localhost:4000/users/deliverers", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: JSON.stringify(values),
    });
    const responseData = await response.json();
    if (response.ok) {
      setOpen(false);
      if (responseData.success) toast.success("Ajouté avec succès.");
      else toast.error("Une erreur s'est produite");
      window.location.reload();
    }
  };

  const handleUpdate = async (values) => {
    const response = await fetch(
      `http://localhost:4000/users/deliverers/${data._id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      },
    );

    let responseData = await response.json();
    if (response.ok) {
      if (responseData.success) toast.success("Modifié avec succès");
      else toast.error("Une erreur s'est produite");

      setOpen(false);
      window.location.reload();
    }
  };

  const onSubmit = async (values) => {
    if (isUpdate) await handleUpdate(values);
    else await handleCreation(values);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {!data && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent className="w-full" side="right">
        <SheetHeader>
          <SheetTitle>{data ? "Modifier" : "Ajouter"} un client</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 p-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Prénom / Nom */}
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
                      <Input placeholder="Adresse" {...field} />
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
                    <FormLabel>Téléphone *</FormLabel>
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

              {/* Mot de passe */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe *</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* N° Identité / Véhicule */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nationalID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N° Carte ident. *</FormLabel>
                      <FormControl>
                        <Input placeholder="XXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehiculeID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matricule véhicule *</FormLabel>
                      <FormControl>
                        <Input placeholder="1234-AB-56" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Photo de profil */}
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo de profil *</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Code de parrainage / Points */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="referralCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code parrainage</FormLabel>
                      <FormControl>
                        <Input placeholder="ABC123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="referredPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Points gagnés</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bouton de soumission */}
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Envoi..."
                  : isUpdate
                    ? "Modifier"
                    : "Ajouter"}
              </Button>
            </form>
          </Form>
        </div>
        <SheetClose asChild></SheetClose>
      </SheetContent>
    </Sheet>
  );
}
