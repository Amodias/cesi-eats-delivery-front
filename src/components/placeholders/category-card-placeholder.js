import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryCardPlaceholder() {
	return (
		<div className="relative grid  grid-rows-[1fr,fit-content] gap-2.5 rounded-lg border border-muted p-2.5">
			<Skeleton className="h-[250px] w-full " />
			<div className="flex flex-col gap-2.5">
				<Skeleton className="h-5 w-2/3 " />
				<Skeleton className="h-20 w-full " />
				<Skeleton className="h-11 w-28 self-end" />
			</div>
		</div>
	);
}
