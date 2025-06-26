"use client";

import { useEffect, useState } from "react";
import {
  Star,
  Clock,
  DollarSign,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

import {
  restaurantCategories,
  restaurantPricing,
  restaurantLabel,
} from "@/constants";
import { getCookie } from "@/lib/cookies";

// const restaurants = [
//   {
//     id: 1,
//     name: "Burger House",
//     rating: 4.8,
//     deliveryTime: "20-30",
//     minOrder: 15,
//     cuisineType: "American",
//     image: "/placeholder.png",
//     priceRange: "$$",
//     labels: ["vegan", "halal"],
//   },
//   {
//     id: 2,
//     name: "Pizza Palace",
//     rating: 4.5,
//     deliveryTime: "25-40",
//     minOrder: 20,
//     cuisineType: "Italian",
//     image: "/placeholder.png",
//     priceRange: "$$",
//     labels: ["bio"],
//   },
//   {
//     id: 3,
//     name: "Sushi Master",
//     rating: 4.9,
//     deliveryTime: "30-45",
//     minOrder: 25,
//     cuisineType: "Japanese",
//     image: "/placeholder.png",
//     priceRange: "$$$",
//     labels: ["gluten"],
//   },
//   {
//     id: 4,
//     name: "Green Bowl",
//     rating: 4.7,
//     deliveryTime: "15-25",
//     minOrder: 18,
//     cuisineType: "Healthy",
//     image: "/placeholder.png",
//     priceRange: "$$",
//     labels: ["vege", "bio"],
//   },
//   {
//     id: 5,
//     name: "Taco Fiesta",
//     rating: 4.6,
//     deliveryTime: "25-35",
//     minOrder: 20,
//     cuisineType: "Mexican",
//     image: "/placeholder.png",
//     priceRange: "$",
//     labels: ["halal"],
//   },
// ];

const cuisineTypes = ["Tous", ...restaurantCategories];
const priceRanges = restaurantPricing.map((price) => {
  switch (price.id) {
    case "cheap":
      return "$";
    case "average":
      return "$$";
    case "expensive":
      return "$$$";
    case "luxe":
      return "$$$$";
    default:
      return "$";
  }
});

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("Tous");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxDeliveryTime, setMaxDeliveryTime] = useState(60);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/users/restaurents",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${getCookie("token")}`,
            },
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setRestaurants([]); // Set to empty array on error
      }
    };
    fetchRestaurants();
  }, []);

  // Filter restaurants based on all criteria
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisineType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine =
      selectedCuisine === "Tous" || restaurant.cuisineType === selectedCuisine;
    const matchesPrice =
      !selectedPriceRange || restaurant.priceRange === selectedPriceRange;

    return matchesSearch && matchesCuisine && matchesPrice;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Search Section */}
      <div className="mb-8">
        <h1 className="mb-6 text-3xl font-bold">Restaurants</h1>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Rechercher des restaurants ou des cuisines..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {/* Desktop Filters */}
            <div className="hidden gap-2 md:flex">
              <Select
                value={selectedCuisine}
                onValueChange={setSelectedCuisine}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type de cuisine" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineTypes.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedPriceRange}
                onValueChange={setSelectedPriceRange}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Prix" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((price) => (
                    <SelectItem key={price} value={price}>
                      {price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filtres
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Type de cuisine
                    </label>
                    <Select
                      value={selectedCuisine}
                      onValueChange={setSelectedCuisine}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        {cuisineTypes.map((cuisine) => (
                          <SelectItem key={cuisine} value={cuisine}>
                            {cuisine}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Gamme de prix</label>
                    <Select
                      value={selectedPriceRange}
                      onValueChange={setSelectedPriceRange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un prix" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((price) => (
                          <SelectItem key={price} value={price}>
                            {price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Note minimale</label>
                    <Slider
                      value={[minRating]}
                      onValueChange={([value]) => setMinRating(value)}
                      min={0}
                      max={5}
                      step={0.5}
                      className="py-4"
                    />
                    <span className="text-sm text-gray-600">
                      {minRating} étoiles
                    </span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Temps de livraison maximum
                    </label>
                    <Slider
                      value={[maxDeliveryTime]}
                      onValueChange={([value]) => setMaxDeliveryTime(value)}
                      min={15}
                      max={60}
                      step={5}
                      className="py-4"
                    />
                    <span className="text-sm text-gray-600">
                      {maxDeliveryTime} minutes
                    </span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRestaurants.map((restaurant) => (
          <Card
            key={restaurant._id}
            className="cursor-pointer transition-shadow hover:shadow-lg"
            onClick={() => {
              window.location.href = `/client/home/${restaurant._id}`;
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={restaurant.banner}
                alt={restaurant.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold">{restaurant.name}</h3>
                  <p className="text-xs text-gray-600">{restaurant.type}</p>
                  <p className="text-xs text-gray-600">
                    {restaurant.priceRange}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {restaurant.badges?.map((labelId) => {
                      const label = restaurantLabel.find(
                        (l) => l.id === labelId,
                      );
                      if (!label) return null;
                      const Icon = label.icon;
                      return (
                        <Badge
                          key={labelId}
                          variant="outline"
                          className={`${label.colors.text} ${label.colors.bg} ${label.colors.border} flex items-center gap-1 border`}
                        >
                          <Icon className="h-3 w-3" />
                          {label.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center rounded bg-green-50 px-2 py-1">
                  <Star
                    className="mr-1 h-3 w-3 text-yellow-400"
                    fill="currentColor"
                  />
                  <span className="text-xs font-medium">
                    {restaurant.rating}
                  </span>
                </div>
              </div>
              {/* <div className="flex items-center gap-3 text-xs text-gray-600">
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{restaurant.deliveryTime} min</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-3 w-3" />
                  <span>Min. {restaurant.minOrder}€</span>
                </div>
              </div> */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results Message */}
      {filteredRestaurants.length === 0 && (
        <div className="py-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Aucun restaurant trouvé
          </h3>
          <p className="text-gray-600">
            Essayez d&apos;ajuster vos filtres ou votre recherche
          </p>
        </div>
      )}
    </div>
  );
}
