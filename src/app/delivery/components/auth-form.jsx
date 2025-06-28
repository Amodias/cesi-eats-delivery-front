import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  User,
  Lock,
  Phone,
  Calendar,
  CreditCard,
  Car,
  Camera,
} from "lucide-react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (isLogin) {
      console.log("Connexion :", {
        nationalID: data.nationalID,
        password: data.password,
      });
      // Appeler service de connexion ici
    } else {
      console.log("Inscription :", data);
      // Appeler service d'inscription ici
    }
    reset();
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        {/* En-tête */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {isLogin ? "Bienvenue ! 👋" : "Rejoignez notre équipe ! 🚗"}
          </h1>
          <p className="text-gray-600">
            {isLogin
              ? "Connectez-vous à votre compte livreur"
              : "Créez votre compte livreur pour commencer"}
          </p>
        </div>

        {/* Conteneur du formulaire */}
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {isLogin ? (
              <>
                {/* Formulaire connexion */}
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Numéro de CIN
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type="text"
                        {...register("nationalID", { required: true })}
                        className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.nationalID ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Entrez votre CIN"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type="password"
                        {...register("password", { required: true })}
                        className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Entrez votre mot de passe"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Formulaire inscription */}
                <div className="space-y-4">
                  {/* Prénom / Nom */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Prénom
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <input
                          type="text"
                          {...register("firstName", { required: true })}
                          className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Prénom"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Nom
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <input
                          type="text"
                          {...register("lastName", { required: true })}
                          className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Nom"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Adresse */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Adresse
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type="text"
                        {...register("address", { required: true })}
                        className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.address ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Votre adresse"
                      />
                    </div>
                  </div>

                  {/* Téléphone / Date de naissance */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Numéro de téléphone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <input
                          type="tel"
                          {...register("phoneNumber", { required: true })}
                          className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Numéro de téléphone"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Date de naissance
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <input
                          type="date"
                          {...register("birthDate")}
                          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CIN / Véhicule */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        CIN
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <input
                          type="text"
                          {...register("nationalID", { required: true })}
                          className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.nationalID ? "border-red-500" : "border-gray-300"}`}
                          placeholder="CIN"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Véhicule
                      </label>
                      <div className="relative">
                        <Car className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <input
                          type="text"
                          {...register("vehiculeID", { required: true })}
                          className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.vehiculeID ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Numéro du véhicule"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mot de passe */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type="password"
                        {...register("password", { required: true })}
                        className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Créez un mot de passe"
                      />
                    </div>
                  </div>

                  {/* Photo de profil */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      URL de la photo de profil (Optionnel)
                    </label>
                    <div className="relative">
                      <Camera className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type="url"
                        {...register("profilePicture")}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        placeholder="URL de la photo de profil"
                      />
                    </div>
                  </div>

                  {/* Code de parrainage */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Code de parrainage (Optionnel)
                    </label>
                    <input
                      type="text"
                      {...register("referralCode")}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      placeholder="Entrez un code si vous en avez un"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Bouton soumettre */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  {isLogin ? "Connexion..." : "Création..."}
                </>
              ) : isLogin ? (
                "Se connecter"
              ) : (
                "Créer un compte"
              )}
            </button>
          </form>

          {/* Basculer mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin
                ? "Vous n'avez pas de compte ?"
                : "Vous avez déjà un compte ?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-2 font-medium text-blue-600 transition-colors hover:text-blue-700"
              >
                {isLogin ? "Inscription" : "Connexion"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
