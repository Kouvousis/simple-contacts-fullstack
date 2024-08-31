import React from "react";
import { CircleUserRound } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-slate-900 p-2 mb-4 text-white">
      <div className="flex flex-shrink-0  items-center mr-6">
        <CircleUserRound className="h-8 w-8 mr-2" width="54" height="54" />
        <span className="font-semibold text-xl tracking-tight">Contacts</span>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a
            href=""
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-600 mr-4"
          >
            Home
          </a>
          <a
            href=""
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-600 mr-4"
          >
            Info
          </a>
          <a
            href=""
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-600"
          >
            Blog
          </a>
        </div>
        <div>
          <button class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-gray-600 mt-4 lg:mt-0">
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
