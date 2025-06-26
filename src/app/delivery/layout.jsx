import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { clientNav } from "@/constants";
import { ThemeProvider } from "next-themes";
import { cookies, headers } from "next/headers";
import DeliverySidebar from "@/components/sidebars/delivery-sidebar";

export const metadata = {
  title: "CESI EATS",
  robots: { index: false },
};

export default async function ClientDashboardLayout({ children }) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  const pathname = headers().get("x-current-path");
  const pagename = clientNav
    .flatMap((section) => section.items)
    .find((item) => item.url === pathname)?.title;

  return (
    <ThemeProvider attribute="class" enableSystem>
      <SidebarProvider defaultOpen={defaultOpen}>
        <DeliverySidebar />
        <ScrollArea className="h-dvh w-full border bg-stone-50 p-1.5 shadow-inner dark:border-none dark:bg-zinc-900 dark:shadow-none md:order-3 md:p-2.5">
          <div className="mb-2.5 flex items-center justify-between rounded-lg bg-accent p-2 dark:bg-zinc-950 md:mb-5 md:hidden">
            <h2 className="ml-2 text-xl font-medium">{pagename}</h2>
            <SidebarTrigger className="text-right" />
          </div>
          <div className="flex flex-col gap-2.5 md:gap-5">{children}</div>
        </ScrollArea>
      </SidebarProvider>
    </ThemeProvider>
  );
}
