import { z } from "zod";

export const clientsFormSchema = z.object({
  firstName: z
    .string({ required_error: "Veuillez saisir votre prénom." })
    .regex(/^[^\d]*$/, {
      message: "Le prénom ne doit pas contenir de chiffres.",
    }),
  lastName: z
    .string({ required_error: "Veuillez saisir votre nom." })
    .regex(/^[^\d]*$/, { message: "Le nom ne doit pas contenir de chiffres." }),
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
