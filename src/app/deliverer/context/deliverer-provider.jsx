"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authService from "../services/auth-deliverer";

const DelivererContext = createContext(null);

export const useDeliverer = () => useContext(DelivererContext);

export default function DelivererProvider({ children }) {
  const [deliverer, setDeliverer] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    authService
      .verifyDeliverer()
      .then(async (res) => {
        let data;
        try {
          data = await res.json();
          console.log("Deliverer data:", data);
        } catch {
          data = null;
        }
        if (isMounted) {
          setDeliverer(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          router.replace("/auth/login");
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading || !deliverer) return null;

  return (
    <DelivererContext.Provider value={deliverer}>
      {children}
    </DelivererContext.Provider>
  );
}
