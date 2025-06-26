"use client";

import { getCookie } from "@/lib/cookies";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RestaurantDetails() {
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const params = useParams();

  const restaurantId = params.id;
  console.log("Restaurant ID:", restaurantId);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      console.log("Fetching restaurant details for ID:", restaurantId);

      try {
        const response = await fetch(
          `http://localhost:4000/users/restaurents/${restaurantId}`,
          {
            type: "GET",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              authorization: `Bearer ${getCookie("token")}`,
            },
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant details");
        }
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };
    const fetchMenu = async () => {
      console.log("Fetching menu for restaurant ID:", restaurantId);
      try {
        const response = await fetch(
          `http://localhost:4000/menu/menus/${restaurantId}`,
          {
            type: "GET",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              authorization: `Bearer ${getCookie("token")}`,
            },
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();
    fetchRestaurantDetails();
  }, []);
  if (!restaurant) return;
  return (
    <div className="mx-auto max-w-3xl p-6 font-sans">
      {/* Image restaurant */}
      <div className="mb-6 overflow-hidden rounded-2xl shadow-lg">
        <img
          src={restaurant.banner}
          alt={restaurant.name}
          className="h-56 w-full object-cover"
        />
      </div>
      {/* Infos restaurant */}
      <h1 className="mb-2 text-4xl font-extrabold text-red-600">
        {restaurant.name}
      </h1>
      <p className="mb-2 text-lg text-gray-700">{restaurant.description}</p>
      <div className="mb-6 text-gray-600">
        <span className="font-semibold">Adresse :</span> {restaurant.address}
      </div>
      {/* Menu */}
      <h2 className="mb-4 text-2xl font-semibold text-red-500">Menu</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {menu.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border bg-white shadow-md transition hover:scale-105 hover:shadow-lg"
          >
            <img
              src={item.image}
              alt={item.nom}
              className="h-40 w-full rounded-t-xl object-cover"
            />
            <div className="p-4">
              <div className="mb-1 text-lg font-semibold">{item.nom}</div>
              <div className="mb-2 text-gray-600">{item.description}</div>
              <div className="text-right text-lg font-bold text-red-600">
                {item.prix} €
              </div>
              <button className="mt-3 w-full rounded bg-red-500 py-2 font-semibold text-white transition hover:bg-red-600">
                Ajouter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

[
  {
    packs: [],
    _id: "6852b9cb49eef52be246ee2f",
    type: "burger",
    articles: [
      {
        _id: "6851970ed0ebef613de35234",
        name: "Burger Classique",
        description: "Un burger classique avec viande, fromage et légumes",
        price: 8.99,
        image: "https://example.com/burger.jpg",
      },
    ],
    __v: 0,
  },
  {
    packs: [
      {
        _id: "6852b9cb49eef52be246ee2f",
        name: "Pack Burger",
        description: "Un burger avec frites et boisson",
        price: 10.99,
        articles: [
          {
            _id: "6851970ed0ebef613de35234",
            name: "Burger Classique",
            description: "Un burger classique avec viande, fromage et légumes",
            price: 8.99,
            image: "https://example.com/burger.jpg",
          },
          {
            _id: "6851970ed0ebef613de35234",
            name: "Burger Classique",
            description: "Un burger classique avec viande, fromage et légumes",
            price: 8.99,
            image: "https://example.com/burger.jpg",
          },
        ],
      },
    ],
    _id: "6852b9cb49eef52be246ee2f",
    type: "burger",
    articles: ["6851970ed0ebef613de35234"],
    __v: 0,
  },
];
