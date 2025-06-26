import { Skeleton } from "@/components/ui/skeleton";

const TablePlaceholder = () => {
  return (
    <div className="w-full rounded-md border p-4">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">
                <Skeleton className="h-4 w-12" />
              </th>
              <th className="border-b p-2">
                <Skeleton className="h-4 w-24" />
              </th>
              <th className="border-b p-2">
                <Skeleton className="h-4 w-16" />
              </th>
              <th className="border-b p-2">
                <Skeleton className="h-4 w-32" />
              </th>
              <th className="border-b p-2">
                <Skeleton className="h-4 w-16" />
              </th>
              <th className="border-b p-2">
                <Skeleton className="h-4 w-16" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="border-t p-2">
                  <Skeleton className="h-4 w-12" />
                </td>
                <td className="border-t p-2">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="border-t p-2">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="border-t p-2">
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="border-t p-2">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="border-t p-2">
                  <Skeleton className="h-4 w-16" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePlaceholder;
