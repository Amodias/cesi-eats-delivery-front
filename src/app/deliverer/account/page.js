"use client";

import DelivererProvider from "../context/deliverer-provider";
import { DelivererCard } from "./components";

const Page = () => {
  return <PageContent />;
};

const PageContent = () => {
  return (
    <DelivererProvider>
      <DelivererCard />;
    </DelivererProvider>
  );
};

export default Page;
