"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PageHeader from "./page-header";
import Loading from "./loading";
import ClientDetails from "./client-details";
import CardActions from "./card-actions";
import { cn, getInitials } from "@/lib/utils";
import { BadgeX } from "lucide-react";
import { toast } from "sonner";
import { loginSchema } from "@/schemas/auth-schemas";
import { apiFetch } from "@/lib/api-wrapper";

async function fetchClients() {
  try {
    const response = await apiFetch("http://127.0.0.1:4000/users/clients", {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!response.ok)
      return toast.error("Une erreur s'est produite lors de la requete.");
    if (response.status === 500)
      return toast.error("Une erreur s'est produite lors de l'ajout.");

    const data = await response.json();

    return data.clients;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const query = useSearchParams().get("query")?.toLocaleLowerCase();
  useEffect(() => {
    fetchClients().then((data) => {
      setClients(data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <Loading />;
  }
  const clientsNumber = clients.length;
  console.log(selectedClient);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="h-full max-h-screen">
          <PageHeader />
          <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-[1fr,2fr]">
            <div
              id="clients-list"
              className="sticky top-0 flex h-fit flex-col gap-2.5 rounded-lg bg-white shadow-md dark:bg-slate-950"
            >
              <div className="border-b border-b-slate-300 p-2.5">
                <h2 className="text-lg font-medium">Liste des clients</h2>
                <p className="text-xs font-semibold text-primary">
                  {clientsNumber} utilisateur{clientsNumber > 1 && "s"}
                </p>
              </div>
              <ul className="flex flex-col gap-2.5 py-2.5 pt-0">
                {clients.map((client) => {
                  const fullastName = `${client.firstName} ${client.lastName}`;
                  if (query && !client.phoneNumber.includes(query)) return;
                  return (
                    <li
                      key={client._id}
                      className={cn(
                        "flex cursor-pointer items-center gap-5 hover:bg-gray-50",
                        selectedClient?._id === client._id && "bg-gray-100",
                      )}
                    >
                      <div
                        className="flex w-full items-center gap-5 px-2.5 py-1.5"
                        onClick={() => setSelectedClient(client)}
                      >
                        <Avatar>
                          <AvatarImage src="/" alt="" />
                          <AvatarFallback className="bg-secondary/70 font-medium text-secondary-foreground">
                            {getInitials(fullastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <p>
                              {client.firstName} {client.lastName}
                            </p>
                            {!client.isActive && (
                              <Badge variant="destructive">
                                <BadgeX className="mr-1.5 size-4" /> Inactif
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs font-light">
                            {client.phoneNumber}
                          </p>
                        </div>
                      </div>
                      <div className="py-1.5 pr-2.5">
                        <CardActions data={client} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            {selectedClient !== null ? (
              <ClientDetails client={selectedClient} />
            ) : (
              <div className="grid h-[400px] w-full place-items-center text-xl font-bold text-gray-400">
                Selectionnez un client pour voir ses informations
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </>
  );
}
