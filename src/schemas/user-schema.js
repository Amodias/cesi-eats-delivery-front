import { userRoles } from "@/constants";
import { z } from "zod";

export const userSchema = z.object({
  id_user: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  password_backup: z.string(),
  role: z.enum(userRoles),
});

export const usersFormSchema = z.object({
  firstName: z
    .string({ required_error: "Veuillez saisir un nom." })
    .min(1, { message: "Veuillez saisir un nom." }),
  lastName: z
    .string({ required_error: "Veuillez saisir un prénom." })
    .min(1, { message: "Veuillez saisir un prénom." }),
  email: z
    .string()
    .email({ message: "Veuillez saisir un email valide." })
    .optional()
    .nullable(),
  phone: z
    .string()
    .regex(/^(0)[0-9]{9}$/, { message: "Numéro de téléphone invalide" }),
  password: z.string({ required_error: "Veuillez saisir un mot de passe." }),
});

export const profileFormSchema = z.object({
  firstName: z
    .string({ required_error: "Veuillez saisir un nom." })
    .min(1, { message: "Veuillez saisir un nom." }),
  lastName: z
    .string({ required_error: "Veuillez saisir un prénom." })
    .min(1, { message: "Veuillez saisir un prénom." }),
  company_name: z
    .string({ required_error: "Veuillez saisir le nom de votre commerce." })
    .min(1, { message: "Veuillez saisir le nom de votre commerce" }),
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  phone: z
    .string()
    .min(1, "Veuillez saisir votre numéro de téléphone.")
    .transform((val) => val.replace(/[^0-9]/g, "")) // Remove all non-numeric characters
    .refine((val) => val.length === 10, {
      message: "Le numéro de téléphone doit contenir exactement 10 chiffres.",
    })
    .refine((val) => val.startsWith("0"), {
      message: "Le numéro de téléphone doit commencer par 0.",
    }),
  id_wilaya: z.string({ required_error: "Veuillez sélectionner une wilaya" }),
  address: z
    .string()
    .min(5, { message: "L'adresse doit contenir au moins 5 caractères" }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Le mot de passe actuel est requis."),
    newPassword: z
      .string()
      .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères."),
    confirmPassword: z
      .string()
      .min(1, "Veuillez confirmer votre nouveau mot de passe."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });
