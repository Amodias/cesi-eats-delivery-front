import { cn, formatPrice } from "@/lib/utils";

export default function PriceTag({ price, className, decimal = true }) {
  const formattedPrice = formatPrice(price, "fr", decimal);
  return (
    <div className={cn("text-lg font-bold text-primary", className)}>
      {formattedPrice}
    </div>
  );
}
