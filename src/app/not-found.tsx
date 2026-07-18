import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="flexcc h-[85vh]">
        <h1 className="text-7xl mb-1">404</h1>
        <h2 className="mb-5 text-xl">Page Not Found!</h2>
        <Link
          href={`/`}
          className="bg-blue-700 text-white px-4 py-2 font-semibold rounded-lg shadow"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
