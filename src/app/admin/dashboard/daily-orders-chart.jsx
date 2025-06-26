"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "2025-06-06", orders: 45 },
  { date: "2025-06-07", orders: 52 },
  { date: "2025-06-08", orders: 49 },
  { date: "2025-06-09", orders: 63 },
  { date: "2025-06-10", orders: 55 },
  { date: "2025-06-11", orders: 58 },
  { date: "2025-06-12", orders: 61 },
];

const chartConfig = {
  orders: {
    label: "Nb. de commandes",
    color: "rgb(var(--primary))",
  },
};

export default function DailyOrdersChart({ chartData }) {
  return (
    <Card className="max-w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          Commandes par jour
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Année {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value, name) => (
                    <div className="flex w-full min-w-[130px] items-center gap-2 text-xs text-muted-foreground">
                      {chartConfig[name]?.label || name}
                      <div className="ml-auto flex items-baseline font-mono font-medium tabular-nums text-foreground">
                        {value}
                      </div>
                    </div>
                  )}
                />
              }
            />
            <Line
              dataKey="orders"
              type="monotone"
              className="fill-secondary"
              strokeWidth={2}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
