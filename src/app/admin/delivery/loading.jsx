import SearchbarPlaceholder from "@/components/placeholders/searchbar-placeholder";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <SearchbarPlaceholder />
      <div className="grid min-h-full grid-cols-[1fr,2fr] gap-5">
        <div className="flex flex-col gap-2.5 rounded-lg bg-white shadow-md">
          <div className="border-b border-b-slate-300 p-2.5">
            <h2 className="text-lg font-medium">Liste des livreurs</h2>
            <Skeleton className="mt-1 h-2 w-2/3" />
          </div>
          <ul className="flex flex-col gap-2.5 py-2.5 pt-0">
            {[0, 1, 2, 3].map((i) => {
              return (
                <li key={i} className="flex items-center gap-5">
                  <div className="flex w-full items-center gap-5 px-2.5 py-1.5">
                    <Skeleton className="h-10 w-10 shrink-0 overflow-hidden rounded-full" />
                    <div className="flex w-full flex-col gap-2.5 p-2.5">
                      <Skeleton className="h-3 w-2/3" />
                      <Skeleton className="h-1.5 w-1/4" />
                    </div>
                  </div>
                  <div className="py-1.5 pr-2.5">
                    <Skeleton className="size-6 rounded-md" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div></div>
      </div>
    </>
  );
}
