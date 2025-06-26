"use client";

import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import DashboardCards from "./cards";
import DailyOrdersChart from "./daily-orders-chart";

// Mockup data - Replace with real data from your API

const popularDishes = [
  { name: "Pizza Margherita", orders: 156 },
  { name: "Burger Classic", orders: 142 },
  { name: "Sushi Mix", orders: 125 },
  { name: "Pasta Carbonara", orders: 98 },
  { name: "Salade César", orders: 85 },
];

const peakHours = [
  { hour: "11h", orders: 45 },
  { hour: "12h", orders: 85 },
  { hour: "13h", orders: 92 },
  { hour: "14h", orders: 75 },
  { hour: "19h", orders: 88 },
  { hour: "20h", orders: 95 },
  { hour: "21h", orders: 80 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-8">
      <h1 className="mb-8 text-3xl font-bold">Tableau de bord</h1>

      {/* KPIs */}
      <DashboardCards />
      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <DailyOrdersChart />

        {/* Popular Dishes Chart */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Plats Populaires</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]">
              <BarChart data={popularDishes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#82ca9d" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card> */}

        {/* Peak Hours Chart */}
        {/* <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Périodes de Pointe</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]">
              <BarChart data={peakHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#8884d8" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
