import { z } from "zod";

export const loginSchema = z.object({
  phoneNumber: z
    .string({ required_error: "Veuillez saisir votre nom d'utilisateur." })
    .min(1, { message: "Veuillez saisir votre nom d'utilisateur." }),
  password: z
    .string({ required_error: "Veuillez saisir votre mot de passe." })
    .min(1, "Veuillez saisir votre mot de passe."),
});

export const clientRegisterSchema = z.object({
  firstName: z
    .string({ required_error: "Veuillez saisir votre prénom." })
    .regex(/^[^\d]*$/, {
      message: "Le prénom ne doit pas contenir de chiffres.",
    })
    .min(1, { message: "Le prenom ne peut pas être vide." }),
  lastName: z
    .string({ required_error: "Veuillez saisir votre nom." })
    .regex(/^[^\d]*$/, { message: "Le nom ne doit pas contenir de chiffres." })
    .min(1, { message: "Le nom ne peut pas être vide." }),
  address: z
    .string({ required_error: "Veuillez saisir votre adresse" })
    .min(1, { message: "L'adresse ne peut pas être vide." }),
  phoneNumber: z
    .string()
    .min(1, "Veuillez saisir votre numéro de téléphone.")
    .transform((val) => val.replace(/[^0-9]/g, "")) // Remove all non-numeric characters
    .refine((val) => val.length === 10, {
      message: "Le numéro de téléphone doit contenir exactement 10 chiffres.",
    })
    .refine((val) => val.startsWith("0"), {
      message: "Le numéro de téléphone doit commencer par 0.",
    }),
  password: z
    .string({ required_error: "Veuillez saisir votre mot de passe." })
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
    .regex(/\d/, {
      message: "Le mot de passe doit contenir au moins un chiffre.",
    }),
});

export const deliveryRegisterSchema = z.object({
  firstName: z
    .string({ required_error: "Veuillez saisir votre prénom." })
    .regex(/^[^\d]*$/, {
      message: "Le prénom ne doit pas contenir de chiffres.",
    }),
  lastName: z
    .string({ required_error: "Veuillez saisir votre nom." })
    .regex(/^[^\d]*$/, { message: "Le nom ne doit pas contenir de chiffres." }),
  nationalID: z
    .string({ required_error: "Veuillez saisir votre N˚ de carte nationale." })
    .min(1, { message: "Le N˚ de carte nationale ne peut pas être vide." }),
  vehiculeID: z
    .string({
      required_error: "Veuillez saisir le matricule de votre vehicule",
    })
    .min(1, {
      message: "Le matricule de votre vehicule ne peut pas être vide.",
    }),
  address: z
    .string({ required_error: "Veuillez saisir votre adresse" })
    .min(1, { message: "L'adresse ne peut pas être vide." }),
  phoneNumber: z
    .string()
    .min(1, "Veuillez saisir votre numéro de téléphone.")
    .transform((val) => val.replace(/[^0-9]/g, "")) // Remove all non-numeric characters
    .refine((val) => val.length === 10, {
      message: "Le numéro de téléphone doit contenir exactement 10 chiffres.",
    })
    .refine((val) => val.startsWith("0"), {
      message: "Le numéro de téléphone doit commencer par 0.",
    }),
  password: z
    .string({ required_error: "Veuillez saisir votre mot de passe." })
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
    .regex(/\d/, {
      message: "Le mot de passe doit contenir au moins un chiffre.",
    }),
});

export const restaurantRegisterSchema = z.object({
  name: z
    .string({ required_error: "Veuillez saisir le nom du restaurant." })
    .min(1, {
      message: "Le nom du restaurant ne peut pas être vide.",
    }),
  priceRange: z.string().min(1, {
    message: "Veuillez sélectionner une fourchette de prix.",
  }),
  badges: z.string().min(1, {
    message: "Veuillez sélectionner un badge.",
  }),
  vehiculeID: z
    .string({
      required_error: "Veuillez saisir le matricule de votre vehicule",
    })
    .min(1, {
      message: "Le matricule de votre vehicule ne peut pas être vide.",
    }),
  address: z
    .string({ required_error: "Veuillez saisir votre adresse" })
    .min(1, { message: "L'adresse ne peut pas être vide." }),
  phoneNumber: z
    .string()
    .min(1, "Veuillez saisir votre numéro de téléphone.")
    .transform((val) => val.replace(/[^0-9]/g, "")) // Remove all non-numeric characters
    .refine((val) => val.length === 10, {
      message: "Le numéro de téléphone doit contenir exactement 10 chiffres.",
    })
    .refine((val) => val.startsWith("0"), {
      message: "Le numéro de téléphone doit commencer par 0.",
    }),
  password: z
    .string({ required_error: "Veuillez saisir votre mot de passe." })
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
    .regex(/\d/, {
      message: "Le mot de passe doit contenir au moins un chiffre.",
    }),
});
