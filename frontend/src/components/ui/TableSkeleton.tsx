import type { TableSkeletonProps } from '../../types';

export const TableSkeleton = ({ rows = 5, columns = 5 }: TableSkeletonProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-neutral-950">
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="px-6 py-3.5 text-left">
                <div className="h-3 bg-neutral-700 rounded w-20 animate-shimmer"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  {colIndex === columns - 1 ? (
                    <div className="flex gap-2">
                      <div className="h-8 w-20 animate-shimmer rounded-lg"></div>
                      <div className="h-8 w-20 animate-shimmer rounded-lg"></div>
                      <div className="h-8 w-8 animate-shimmer rounded-lg"></div>
                    </div>
                  ) : (
                    <div
                      className="h-3.5 animate-shimmer rounded"
                      style={{ width: `${Math.random() * 30 + 50}%` }}
                    ></div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
