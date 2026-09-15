import React from "react";
import { Scissors } from "lucide-react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
        <div className="absolute p-2 bg-purple-600 text-white rounded-lg shadow-md">
          <Scissors className="w-5 h-5 animate-pulse" />
        </div>
      </div>
      <p className="mt-4 text-gray-700 font-semibold text-sm">{text}</p>
    </div>
  );
};

export default Loader;