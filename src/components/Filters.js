import React from "react";
import { Search, Filter, RotateCcw } from "lucide-react";

const Filters = ({ searchTerm, setSearchTerm, resetFilters }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by customer name or date"
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm font-semibold"
          value={searchTerm.search}
          onChange={(e) =>
            setSearchTerm({ ...searchTerm, search: e.target.value })
          }
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Sort Select */}
        <div className="w-full sm:w-64">
          <select
            value={searchTerm.sort}
            onChange={(e) =>
              setSearchTerm({ ...searchTerm, sort: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 text-sm font-medium bg-white"
          >
            <option value="">Sort by Date</option>
            <option value="oldest">Oldest to Newest</option>
            <option value="newest">Newest to Oldest</option>
          </select>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          
          <button
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
              searchTerm.status === "pending"
                ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
            onClick={() => setSearchTerm({ ...searchTerm, status: "pending" })}
          >
            Pending
          </button>

          <button
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
              searchTerm.status === "done"
                ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
            onClick={() => setSearchTerm({ ...searchTerm, status: "done" })}
          >
            Done
          </button>

          <button
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
              searchTerm.status === "canceled" || searchTerm.status === "canceled by user"
                ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
            onClick={() =>
              setSearchTerm({
                ...searchTerm,
                status: "canceled",
              })
            }
          >
            Canceled
          </button>
        </div>

        {/* Reset Filter Button */}
        <button
          className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition shadow-sm ml-auto"
          onClick={resetFilters}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
