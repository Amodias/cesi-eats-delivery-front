"use client";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Searchbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (query) => {
    const params = new URLSearchParams(searchParams);
    if (query !== "") params.set("query", query);
    else params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex w-full max-w-sm items-end gap-2.5">
      <div className="w-full">
        <Input
          type="search"
          placeholder="Rechercher ..."
          defaultValue={searchParams.get("query")?.toString()}
          onChange={(e) => {
            debounce(handleSearch(e.target.value), 200);
          }}
        />
      </div>
    </div>
  );
}
