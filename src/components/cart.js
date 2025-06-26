"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart-item";
import { cn, formatPrice } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag, ShoppingBasket, Trash2 } from "lucide-react";
import { clearCart, getCart, getTotalCartValue } from "@/lib/cart-manager";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Cart({ scrolled }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      setCart(getCart());
      setTotal(getTotalCartValue());
    };

    updateCart();

    window.addEventListener("cartUpdate", updateCart);
    return () => window.removeEventListener("cartUpdate", updateCart);
  }, []);

  if (!cart) return null;

  const handleCartUpdate = () => {
    setCart(getCart());
  };

  const handleCartClear = () => {
    clearCart();
    setCart([]);
    setTotal(getTotalCartValue());
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2.5">
          <Button
            data-count={cart.length}
            variant="ghost"
            size="icon"
            className={cn(
              "relative before:absolute before:right-1.5 before:top-0 before:aspect-square before:w-5 before:rounded-full before:bg-white before:p-0.5 before:text-xs before:text-muted-foreground before:content-[attr(data-count)]",
            )}
          >
            <ShoppingBag />
          </Button>
          <span
            className={cn(
              "text-xs font-medium",
              scrolled ? "text-white" : "text-primary",
            )}
          >
            {total !== 0 && formatPrice(total, "fr", false)}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="grid w-full grid-rows-[110px,1fr,110px] gap-0 p-0">
        <SheetHeader className="border border-b-muted bg-background p-5">
          <SheetTitle>Votre panier</SheetTitle>
          {cart.length !== 0 && (
            <div className="flex items-center justify-between font-normal">
              <Button
                size="xs"
                variant="ghost"
                className="gap-1 text-destructive"
                onClick={handleCartClear}
              >
                <Trash2 /> {Vider}
              </Button>
              <div className="text-sm text-muted-foreground">
                {cart.length} {cart.length > 1 ? "articles" : "article"}
              </div>
            </div>
          )}
        </SheetHeader>
        <ScrollArea>
          <div className="flex flex-col gap-5 p-5">
            {cart.map((item) => (
              <CartItem
                key={item._id}
                data={item}
                onCartUpdate={handleCartUpdate}
              />
            ))}
            {cart.length === 0 && (
              <div className="flex w-full flex-col items-center py-40 font-semibold text-muted-foreground">
                <ShoppingBasket className="h-[100px] w-[100px]" />
                Votre panier est vide
                <span className="text-sm">
                  Ajoutez des articles pour commencer
                </span>
              </div>
            )}
          </div>
        </ScrollArea>
        {cart.length !== 0 && (
          <SheetFooter className="flex-col border border-t-muted bg-background p-4 sm:flex-col">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-semibold text-primary">Sous-total</h2>
              <span className="text-lg font-bold">
                {formatPrice(total, "fr", false)}
              </span>
            </div>
            <SheetClose asChild>
              <Link href="/client/checkout">
                <Button className="w-full">Commander</Button>
              </Link>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
