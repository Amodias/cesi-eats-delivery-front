import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardplaceholder() {
	return (
		<div className="relative grid grid-rows-[1fr,fit-content] gap-2.5 rounded-lg border border-muted p-2.5 ">
			<Skeleton className="h-[250px] w-full " />
			<div className="flex flex-col gap-2.5">
				<Skeleton className="h-5 w-2/3 " />
				<Skeleton className="h-12 w-full " />
				<Skeleton className="h-5 w-2/5 " />
				<div className="mt-2.5 grid grid-cols-2 gap-2.5">
					<Skeleton className="h-10" />
					<Skeleton className="h-10" />
				</div>
			</div>
		</div>
	);
}
