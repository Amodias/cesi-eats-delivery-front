"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

import { deliveryRegisterSchema } from "@/schemas/auth-schemas";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";

// vehiculeID
// nationalID
// password
// phoneNumber
// address
// lastName
// firstName

export default function DeliveryRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: true,
  });

  const onSubmit = async () => {
    const values = form.getValues();

    await fetch("http://localhost:4001/deliverers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    // if (!response.ok)
    //   return toast.error("Une erreur s'est produite lors de la requete.");
    // const responseData = await response.json();

    // if (!responseData.success)
    //   return toast.error("Une erreur s'est produite lors de l'ajout.");

    const response2 = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });
    if (!response2.ok)
      return toast.error("Un problème est survenu lors de l'authentification.");

    if (response2.status === 401)
      return toast.error("Identifiants incorrects. Veuillez réessayer.");

    const data = await response2.json();
    console.log(data);

    toast.success(`Authentification réussie. Bienvenue ${data.firstName}`);

    document.cookie = `token=${data.accessToken}; path=/; max-age=86400; secure; samesite=strict`;
    toast.success("Ajouté avec succès.");
    router.replace(data.redirectUrl);
    form.reset();
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-center justify-center space-y-3"
      >
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nom *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nom"
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Prénom *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Prenom"
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="vehiculeID"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Matricule vehicule *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Le matricule de votre vehicule"
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationalID"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>N˚ de carte nationale *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="le numéro de carte nationale"
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Date de naissance *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Adresse *</FormLabel>
              <FormControl>
                <Input
                  placeholder="addresse"
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>N˚ de téléphone *</FormLabel>
              <FormControl>
                <Input
                  placeholder="N˚ de téléphone"
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Mot de passe *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="pr-10"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="referralCode"
          render={({ field }) => (
            <FormItem className="w-full">
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
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Traitement..." : "S'inscrire"}
        </Button>
      </form>
    </Form>
  );
}
