"use client";
import logo from "..@/public/placeholder.png";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import RegisterTypeDialog from "@/components/auth/register-type-dialog";

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, { message: "Veuillez saisir votre numéro de téléphone." }),
  password: z
    .string()
    .min(1, { message: "Veuillez saisir votre mot de passe." }),
});

export default function Login() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (values) => {
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });
    if (!response.ok)
      return toast.error("Un problème est survenu lors de l'authentification.");

    if (response.status === 401)
      return toast.error("Identifiants incorrects. Veuillez réessayer.");

    const data = await response.json();
    console.log(data);

    toast.success(`Authentification réussie. Bienvenue ${data.firstName}`);

    document.cookie = `token=${data.accessToken}; path=/; max-age=86400; secure; samesite=strict`;

    window.location.href = data.redirectUrl || "/";
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f6f6] px-2">
      <div className="flex w-full max-w-md flex-col gap-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={logo}
            alt="Uber Eats Logo"
            width={64}
            height={64}
            className="rounded-full border border-gray-200 bg-gray-100"
            priority
          />
          <h1 className="text-3xl font-extrabold text-gray-900">
            Se connecter à CESI Eats
          </h1>
          <p className="max-w-xs text-center text-base text-gray-600">
            Entrez votre numéro de téléphone pour continuer
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-gray-800">
                    Numéro de téléphone
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="06 12 34 56 78"
                      type="tel"
                      autoComplete="tel"
                      className="border-gray-200 bg-gray-50 focus:border-primary"
                      {...field}
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
                  <FormLabel className="font-semibold text-gray-800">
                    Mot de passe
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Votre mot de passe"
                      autoComplete="current-password"
                      className="border-gray-200 bg-gray-50 focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full text-base font-bold"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </Form>
        <div className="mt-2 flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500">
            Nouveau sur Uber Eats ?{" "}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="font-semibold text-primary hover:underline focus:outline-none"
            >
              Créer un compte
            </button>
          </span>
          <Link href="#" className="text-xs text-gray-400 hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>
      </div>
      <RegisterTypeDialog open={open} onOpenChange={setOpen} />
    </main>
  );
}
