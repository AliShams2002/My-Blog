"use client";

// Simple, concise skeleton for all dashboard pages
const Skeleton = ({ type = "table" }) => {
  // table - Simple table skeleton
  if (type === "table") {
    return (
      <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="p-4 border-b border-gray-700/50">
          <div className="h-10 bg-gray-700/50 rounded-lg w-full md:w-80 animate-pulse" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700">
              <tr className="text-right">
                {[...Array(5)].map((_, i) => (
                  <th key={i} className="pb-3 px-4">
                    <div className="h-4 bg-gray-700/50 rounded w-20 animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-gray-700/50">
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="h-4 bg-gray-700/50 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // card - Simple cards skeleton
  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-5 bg-gray-800/30 rounded-xl border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-700/50 rounded-xl animate-pulse" />
              <div className="w-16 h-4 bg-gray-700/50 rounded animate-pulse" />
            </div>
            <div className="h-8 bg-gray-700/50 rounded w-20 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-700/50 rounded w-32 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  // form - Simple form skeleton
  if (type === "form") {
    return (
      <div className="bg-[#1F1F24] rounded-xl border border-[#3F3F46] p-6">
        <div className="h-6 bg-gray-700/50 rounded w-40 mb-6 animate-pulse" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-700/50 rounded w-24 mb-2 animate-pulse" />
              <div className="h-10 bg-gray-700/50 rounded w-full animate-pulse" />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          <div className="h-10 bg-gray-700/50 rounded flex-1 animate-pulse" />
          <div className="h-10 bg-gray-700/50 rounded flex-1 animate-pulse" />
        </div>
      </div>
    );
  }

  // default - Simple linear skeleton
  return (
    <div className="space-y-4">
      <div className="h-10 bg-gray-700/50 rounded w-full animate-pulse" />
      <div className="h-32 bg-gray-700/50 rounded w-full animate-pulse" />
      <div className="h-32 bg-gray-700/50 rounded w-full animate-pulse" />
    </div>
  );
};

export default Skeleton;
