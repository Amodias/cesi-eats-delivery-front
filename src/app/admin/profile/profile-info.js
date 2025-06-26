"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { profileFormSchema } from "@/schemas/user-schema";
import { formatDateTime, getInitials } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ProfileInfo({ user }) {
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch("/shop/api/users", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok)
        return toast.error("Une erreur s'est produite lors de la requête.");

      const responseData = await response.json();
      router.refresh();

      if (responseData.success) toast.success("Modifié avec succès.");
      else toast.error("Une erreur s'est produite lors de la modification.");
    } catch (error) {
      console.error("Error in handleUpdate:", error);
      toast.error("Oops, une erreur s'est produite.");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          Informations personnelles
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Mettez à jour vos informations de profil ici.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-5 flex w-full items-center gap-5">
          <Avatar className="size-14">
            <AvatarFallback className="bg-primary/30 text-lg font-medium">
              {getInitials(`${user.firstName} ${user.lastName}`)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              {/* Inscrit le {formatDateTime(user.creation_date)} */}
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid space-y-2.5"
          >
            <div className="flex flex-col gap-2.5 xl:flex-row">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre prénom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2.5 xl:flex-row">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full xl:w-1/3">
                    <FormLabel>N˚ de téléphone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="votre numéro de téléphone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full xl:w-2/3">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="votre@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2.5 xl:flex-row">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full xl:w-2/3">
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre adresse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full justify-self-center xl:w-fit"
            >
              Enregistrer
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
