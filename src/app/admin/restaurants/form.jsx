"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { clientsFormSchema } from "@/schemas/client-schema";
import { toast } from "sonner";

export default function UsersForm({ children, data, open, setOpen }) {
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
    const response = await fetch("/dashboard/clients/api", {
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
    const response = await fetch(`/dashboard/clients/api`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    });

    let responseData = await response.json();
    if (response.ok) {
      if (responseData.success) {
        toast.success("Modifié avec succès");
      } else {
        toast.error("Une erreur s'est produite");
      }
      setOpen(false);
      window.location.reload();
    }
  };

  const onSubmit = async (values) => {
    if (isUpdate) await handleUpdate({ ...values, id: data.id });
    else await handleCreation(values);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {!data && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent className="w-full" side="right">
        <SheetHeader>
          <SheetTitle>{data ? "Modifier" : "Ajouter"} un client</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 p-2.5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-wrap items-center justify-center space-y-3"
            >
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
                        placeholder="Prénom"
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
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>E-mail *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Adresse mail"
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>N˚ de téléphone *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Numéro de téléphone"
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
                      <Input
                        placeholder="Mot de passe"
                        defaultValue={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Envoi..." : "Confirmer"}
              </Button>
            </form>
          </Form>
        </div>
        <SheetClose asChild></SheetClose>
      </SheetContent>
    </Sheet>
  );
}
