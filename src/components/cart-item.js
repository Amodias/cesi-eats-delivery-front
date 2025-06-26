import Image from "next/image";
import PriceTag from "@/components/price-tag";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus } from "lucide-react";
import { removeFromCart, updateProductQuantity } from "@/lib/cart-manager";

import { useState } from "react";

export default function CartItem({ data, onCartUpdate }) {
  const [quantity, setQuantity] = useState(data.quantity);

  function handleRemoveFromCart() {
    removeFromCart(data.id_product);
    onCartUpdate();
  }

  function handleQuantityChange(newQuantity) {
    newQuantity = Math.max(1, Math.min(data.tmp_stock, newQuantity));
    setQuantity(newQuantity);
    updateProductQuantity(data.id_product, newQuantity);
    onCartUpdate();
  }

  return (
    <div className="relative grid w-full grid-cols-[100px,1fr] gap-2.5 border-b pb-2">
      <Button
        variant="destructive"
        size="icon"
        className="absolute left-0 top-0 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
        onClick={handleRemoveFromCart}
      >
        <X className="size-4" />
      </Button>
      <Image
        src={`/api/img/${data.main_image}`}
        width={100}
        height={100}
        alt={data.product_name}
        className="size-[100px] self-center object-cover"
      />

      <div className="flex flex-col justify-center">
        <p className="font-semibold">{data.product_name}</p>

        <PriceTag
          className="text-xs"
          discount={discount}
          price={data.price}
          decimal={false}
        />

        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="size-10"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            <Minus className="size-4" />
          </Button>
          <Input
            type="number"
            min="1"
            max={data.tmp_stock}
            disabled
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            className="mx-1 size-11 text-center [appearance:textfield] disabled:cursor-auto disabled:opacity-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <Button
            variant="ghost"
            size="icon"
            className="size-10"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
