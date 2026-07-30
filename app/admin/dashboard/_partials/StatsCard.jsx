import React from "react";

const StatsCard = ({ statsCards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsCards.map((stat, index) => (
        <div
          key={index}
          className="group relative overflow-hidden p-5 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
        >
          {/* Gradient background overlay that appears on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          ></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center shadow-lg`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {/* Stat value and title */}
              <div className="flex flex-col items-end">
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <p className="text-sm text-gray-400">{stat.title}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
