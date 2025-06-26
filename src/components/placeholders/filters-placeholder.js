import { Skeleton } from "@/components/ui/skeleton";
import SearchbarPlaceholder from "./searchbar-placeholder";

export default function FiltersPlaceholder() {
	return (
		<div className="flex flex-col gap-2.5">
			<SearchbarPlaceholder />
			<div className="flex items-center justify-between">
				<Skeleton className="h-10 w-24" />
				<Skeleton className="h-4 w-14" />
			</div>
		</div>
	);
}
