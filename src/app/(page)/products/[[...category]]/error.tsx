"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <h1 className="font-bold text-3xl mt-10 mb-5 text-transparent select-none">
        Products
      </h1>

      <div className="text-center flexcc h-[70vh] w-[95%]">
        <h2 className="font-semibold mb-2">Something went wrong!</h2>
        <button
          className="bg-yellow-500 px-4 py-2 rounded-lg shadow font-bold"
          onClick={() => reset()}
        >
          Try Again!
        </button>
      </div>
    </>
  );
}
