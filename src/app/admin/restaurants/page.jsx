"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PageHeader from "./page-header";
import Loading from "./loading";
import RestaurantDetails from "./restaurant-details";
import CardActions from "./card-actions";
import { cn, getInitials } from "@/lib/utils";
import { BadgeX } from "lucide-react";
import { toast } from "sonner";

async function fetchRestaurant() {
  return [
    {
      id: 0,
      firstName: "TEST",
      lastName: "TEST",
      phoneNumber: "0123456789",
      email: "email@test.com",
      address: "123 Test St, Test City",
      referralCode: "TEST123",
      referralPoints: 9999,
      rating: 5,
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
    },
  ];
  try {
    const response = await fetch("/admin/restaurant/api", {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!response.ok)
      return toast.error("Une erreur s'est produite lors de la requete.");
    const responseData = await response.json();

    if (!responseData.success)
      return toast.error("Une erreur s'est produite lors de l'ajout.");
    const data = await response.json();
    return data.restaurant;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const query = useSearchParams().get("query")?.toLocaleLowerCase();
  useEffect(() => {
    fetchRestaurant().then((data) => {
      setRestaurant(data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <Loading />;
  }
  const restaurantNumber = restaurant.length;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="h-full max-h-screen">
          <PageHeader />
          <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-[1fr,2fr]">
            <div
              id="restaurant-list"
              className="sticky top-0 flex h-fit flex-col gap-2.5 rounded-lg bg-white shadow-md dark:bg-slate-950"
            >
              <div className="border-b border-b-slate-300 p-2.5">
                <h2 className="text-lg font-medium">Liste des restaurants</h2>
                <p className="text-xs font-semibold text-primary">
                  {restaurantNumber} livreur{restaurantNumber > 1 && "s"}
                </p>
              </div>
              <ul className="flex flex-col gap-2.5 py-2.5 pt-0">
                {restaurant.map((restaurant) => {
                  const fullastName = `${restaurant.firstName} ${restaurant.lastName}`;
                  if (query && !restaurant.phoneNumber.includes(query)) return;
                  return (
                    <li
                      key={restaurant.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-5 hover:bg-gray-50",
                        selectedRestaurant?.id === restaurant.id &&
                          "bg-gray-100",
                      )}
                    >
                      <div
                        className="flex w-full items-center gap-5 px-2.5 py-1.5"
                        onClick={() => setSelectedRestaurant(restaurant)}
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
                              {restaurant.firstName} {restaurant.lastName}
                            </p>
                          </div>
                          <p className="text-xs font-light">
                            {restaurant.phoneNumber}
                          </p>
                        </div>
                      </div>
                      <div className="py-1.5 pr-2.5">
                        <CardActions data={restaurant} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* {selectedRestaurant !== null ? (
              <RestaurantDetails restaurant={selectedRestaurant} />
            ) : (
              <div className="grid h-[400px] w-full place-items-center text-xl font-bold text-gray-400">
                Selectionnez un restaurant pour voir ses informations
              </div>
            )} */}
            <RestaurantDetails />
          </div>
        </div>
      </Suspense>
    </>
  );
}
