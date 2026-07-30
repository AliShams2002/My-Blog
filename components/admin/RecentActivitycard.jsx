import Link from "next/link";
import React from "react";

const RecentActivitycard = ({ icon, href, title, children }) => {
  return (
    <div className="p-5 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <Link
          className="text-xs text-purple-400 hover:text-purple-300"
          href={href}
        >
          مشاهده همه
        </Link>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
};

export default RecentActivitycard;
