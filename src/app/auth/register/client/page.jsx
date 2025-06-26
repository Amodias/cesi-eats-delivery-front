import ClientRegisterForm from "./client-register-form";
import Image from "next/image";

export default function ClientRegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 px-4 py-8">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white p-8 shadow-xl md:p-10">
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/placeholder.png"
            alt="CesiEats Logo"
            width={64}
            height={64}
            className="mb-2 h-16 w-16 rounded-full shadow-md"
          />
          <h1 className="text-center text-3xl font-bold text-green-600 md:text-4xl">
            Créer un compte client
          </h1>
          <p className="text-center text-base text-gray-500 md:text-lg">
            Rejoignez CesiEats et commandez vos plats préférés en quelques clics
            !
          </p>
        </div>
        <ClientRegisterForm />
        <div className="mt-2 text-center text-sm text-gray-500">
          Vous avez déjà un compte ?{" "}
          <a
            href="/auth/login"
            className="font-medium text-green-600 hover:underline"
          >
            Connectez-vous
          </a>
        </div>
      </div>
    </div>
  );
}
