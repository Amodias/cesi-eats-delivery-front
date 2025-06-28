"use client";

import DelivererProvider from "../context/deliverer-provider";
import OrdersList from "./components/orders-list";

const Page = () => {
  return <PageContent />;
};

const PageContent = () => {
  return (
    <DelivererProvider>
      <OrdersList />
    </DelivererProvider>
  );
};

export default Page;
