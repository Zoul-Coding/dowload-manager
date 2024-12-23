import React from "react";
import { Link } from "react-router-dom";
import { Folder } from "lucide-react";

const FoldersView = () => {
  return (
    <section className="pb-8">
      <div className="grid grid-cols-4 gap-6">
        <Link
          to="#"
          className="flex flex-col justify-center items-center gap-0 bg-gray-100 px-2 py-2 rounded hover:bg-gray-200"
        >
          <Folder className="w-10 h-10 text-blue-400" />
          <p className="text-md text font-medium text-gray-500">Download</p>
        </Link>
        <Link
          to="/picture"
          className="flex flex-col justify-center items-center gap-0 bg-gray-100 px-2 py-2 rounded hover:bg-gray-200"
        >
          <Folder className="w-10 h-10 text-blue-400" />
          <p className="text-md text-center font-medium text-gray-500">
            Pictures
          </p>
        </Link>
        <Link
          to="/video"
          className="flex flex-col justify-center items-center gap-0 bg-gray-100 px-2 py-2 rounded hover:bg-gray-200"
        >
          <Folder className="w-10 h-10 text-blue-400" />
          <p className="text-md text-center font-medium text-gray-500">
            Videos
          </p>
        </Link>
        <Link
          to="#"
          className="flex flex-col justify-center items-center gap-0 bg-gray-100 px-2 py-2 rounded hover:bg-gray-200"
        >
          <Folder className="w-10 h-10 text-blue-400" />
          <p className="text-md text-center font-medium text-gray-500">Pdf</p>
        </Link>
      </div>
    </section>
  );
};

export default FoldersView;
