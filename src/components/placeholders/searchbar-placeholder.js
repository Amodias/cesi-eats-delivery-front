import { Skeleton } from "@/components/ui/skeleton";

export default function SearchbarPlaceholder() {
	return (
		<div className="flex w-full max-w-sm items-center space-x-2">
			<Skeleton className="h-10 w-full" />
			<Skeleton className="h-10 w-14" />
		</div>
	);
}
