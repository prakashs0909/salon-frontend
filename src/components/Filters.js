import React from "react";

const Filters = ({ searchTerm, setSearchTerm, resetFilters }) => {
  return (
    <div>
      <div className="mb-4 mt-16 pt-4">
        <input
          type="text"
          placeholder="Search by customer name or date"
          className="p-2 border border-gray-300 rounded-md w-full fw-bold"
          value={searchTerm.search}
          onChange={(e) =>
            setSearchTerm({ ...searchTerm, search: e.target.value })
          }
        />
      </div>

      <div className="mb-4">
        <select
          value={searchTerm.sort}
          onChange={(e) =>
            setSearchTerm({ ...searchTerm, sort: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Sort by</option>
          <option value="oldest">Oldest to Newest</option>
          <option value="newest">Newest to Oldest</option>
        </select>
      </div>
      <div className="mb-4">
        <button
          className={`p-2 border border-gray-300 rounded-md mr-2 ${
            searchTerm.status === "pending" ? "bg-gray-300" : ""
          }`}
          onClick={() => setSearchTerm({ ...searchTerm, status: "pending" })}
          
        >
          Pending
        </button>
        <button
          className={`p-2 border border-gray-300 rounded-md mr-2 ${
            searchTerm.status === "done" ? "bg-gray-300" : ""
          }`}
          onClick={() => setSearchTerm({ ...searchTerm, status: "done" })}
        >
          Done
        </button>
        <button
          className={`p-2 border border-gray-300 rounded-md ${
            searchTerm.status === "canceled" ? "bg-gray-300" : ""
          }`}
          onClick={() => setSearchTerm({ ...searchTerm, status: "canceled", canceled: true })}
        >
          cancel
        </button>
      </div>
      <div className="mb-4">
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
