"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authService from "../services/auth-deliverer";

const DelivererContext = createContext(null);
export const useDeliverer = () => useContext(DelivererContext);

// runtime validator: only returns true if it looks like a real deliverer
function isDeliverer(obj) {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj._id === "string" &&
    typeof obj.firstName === "string" &&
    typeof obj.lastName === "string" &&
    typeof obj.phoneNumber === "string"
    // add any other essential checks here
  );
}

export default function DelivererProvider({ children }) {
  const [deliverer, setDeliverer] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    authService
      .verifyDeliverer()
      .then(async (res) => {
        let json;
        try {
          json = await res.json();
        } catch {
          json = null;
        }

        if (!isMounted) return;

        if (isDeliverer(json)) {
          setDeliverer(json);
        } else {
          router.replace("/auth/login");
        }

        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        router.replace("/auth/login");
        setLoading(false);
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
