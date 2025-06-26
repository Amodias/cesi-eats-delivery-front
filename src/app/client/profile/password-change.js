"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { changePasswordSchema } from "@/schemas/user-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(values) {
		delete values.confirmPassword;

		try {
			const response = await fetch("/shop/api/users", {
				method: "PATCH",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			if (!response.ok) return toast.error("Une erreur s'est produite lors de la requête.");

			const responseData = await response.json();

			if (!responseData.success) {
				return form.setError("currentPassword", {
					type: "manual",
					message: "Le mot de passe est incorrect.",
				});
			}

			router.refresh();
		} catch (error) {
			console.error("Error in handleUpdate:", error);
			toast.error("Oops, une erreur s'est produite.");
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl md:text-2xl">Modifier votre mot de passe</CardTitle>
				<CardDescription className="text-xs md:text-sm">Mettez à jour votre mot de passe ici.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 grid">
						<FormField
							control={form.control}
							name="currentPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mot de passe actuel</FormLabel>
									<FormControl>
										<Input type="password" placeholder="Votre mot de passe actuel" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="newPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nouveau mot de passe</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type={showPassword ? "text" : "password"}
												placeholder="Votre nouveau mot de passe"
												{...field}
											/>
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
												onClick={() => setShowPassword(!showPassword)}>
												{showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
												<span className="sr-only">
													{showPassword ? "Cacher le mot de passe" : "Montrer le mot de passe"}
												</span>
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirmer le nouveau mot de passe</FormLabel>
									<FormControl>
										<Input type="password" placeholder="Confirmez votre nouveau mot de passe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full lg:w-fit justify-self-center">
							Modifier le mot de passe
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
