"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PageHeader from "./page-header";
import Loading from "./loading";
import DeliveryDetails from "./delivery-details";
import CardActions from "./card-actions";
import { cn, getInitials } from "@/lib/utils";
import { BadgeX } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api-wrapper";

async function fetchDelivery() {
  try {
    const response = await apiFetch("http://127.0.0.1:4000/users/deliverers", {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!response.ok)
      return toast.error("Une erreur s'est produite lors de la requete.");
    if (response.status === 500)
      return toast.error("Une erreur s'est produite lors de l'ajout.");

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Delivery() {
  const [delivery, setDelivery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const query = useSearchParams().get("query")?.toLocaleLowerCase();
  useEffect(() => {
    fetchDelivery().then((data) => {
      setDelivery(data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <Loading />;
  }
  const deliveryNumber = delivery.length;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="h-full max-h-screen">
          <PageHeader />
          <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-[1fr,2fr]">
            <div
              id="delivery-list"
              className="sticky top-0 flex h-fit flex-col gap-2.5 rounded-lg bg-white shadow-md dark:bg-slate-950"
            >
              <div className="border-b border-b-slate-300 p-2.5">
                <h2 className="text-lg font-medium">Liste des livreurs</h2>
                <p className="text-xs font-semibold text-primary">
                  {deliveryNumber} livreur{deliveryNumber > 1 && "s"}
                </p>
              </div>
              <ul className="flex flex-col gap-2.5 py-2.5 pt-0">
                {delivery.map((delivery) => {
                  const fullastName = `${delivery.firstName} ${delivery.lastName}`;
                  if (query && !delivery.phoneNumber.includes(query)) return;
                  return (
                    <li
                      key={delivery._id}
                      className={cn(
                        "flex cursor-pointer items-center gap-5 hover:bg-gray-50",
                        selectedDelivery?._id === delivery._id && "bg-gray-100",
                      )}
                    >
                      <div
                        className="flex w-full items-center gap-5 px-2.5 py-1.5"
                        onClick={() => setSelectedDelivery(delivery)}
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
                              {delivery.firstName} {delivery.lastName}
                            </p>
                          </div>
                          <p className="text-xs font-light">
                            {delivery.phoneNumber}
                          </p>
                        </div>
                      </div>
                      <div className="py-1.5 pr-2.5">
                        <CardActions data={delivery} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            {selectedDelivery !== null ? (
              <DeliveryDetails delivery={selectedDelivery} />
            ) : (
              <div className="grid h-[400px] w-full place-items-center text-xl font-bold text-gray-400">
                Selectionnez un livreur pour voir ses informations
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </>
  );
}
