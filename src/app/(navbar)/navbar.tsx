"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { MySession } from "@/interfaces/mySession";

const Navbar = () => {
  const { data, status } = useSession() as MySession;
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();

  return (
    <>
      <nav className="bg-gray-900 text-white w-full">
        <div className="container mx-auto px-4 py-3 flexc !justify-between">
          {/* Logo */}
          <div className="flexc gap-3 w-52">
            <Image
              width={2000}
              height={2000}
              src="https://img.freepik.com/premium-vector/modern-shoes-logo-template-design_316488-856.jpg?w=2000"
              alt="Logo"
              className="rounded-full w-16"
            />
            <h1 className="text-lg font-semibold w-28 flexc" id="app-title">
              My Tokoku
            </h1>
          </div>

          {/* Menu */}
          <ul className="flex space-x-8 mx-2">
            {[
              { href: "/", text: "Home" },
              { href: "/products", text: "Store" },
              { href: "/about", text: "About" },
              { href: "/about/profile", text: "Profile" },
            ].map((value, index) => (
              <li key={index}>
                <Link
                  href={value.href}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={`hover:text-white transall clicked flexc animate-squish ${
                    pathname === value.href
                      ? "text-gray-300 font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  {value.text}
                </Link>
              </li>
            ))}

            {data ? (
              <li>
                <div className="hover:text-gray-400 transall clicked flexc animate-squish">
                  <div className="flexc gap-2 relative">
                    <span className="w-8 flexc relative">
                      <Image
                        width={576}
                        height={576}
                        className="w-8 h-8 rounded-full transcenter outline outline-white"
                        src={
                          data?.user?.image ||
                          "https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
                        }
                        alt={data?.user?.fullname || "unknown"}
                      />
                    </span>

                    <span>{data?.user?.fullname}</span>
                    <span>{`-->`}</span>
                    <span
                      className={`font-bold ${
                        data?.user?.role === "admin"
                          ? "text-yellow-500"
                          : "text-sky-500"
                      }`}
                    >
                      {data?.user?.role}
                    </span>
                  </div>
                </div>
              </li>
            ) : (
              ""
            )}

            <li>
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/* ======================================== JIKA LOADING ======================================== */}
              {status === "loading" && (
                <div
                  className={`text-gray-400 cursor-wait transall animate-squish`}
                >
                  Loading...
                </div>
              )}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}

              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/* ======================================== JIKA TERAUTENTIKASI ======================================== */}
              {status === "authenticated" && (
                <button
                  disabled={isLoading}
                  onClick={() => {
                    setIsLoading(true);
                    signOut();
                  }}
                  className={`hover:text-gray-400 transall animate-squish ${
                    !isLoading && "clicked"
                  } disabled:!cursor-wait`}
                >
                  {isLoading ? "Loading..." : "Sign Out"}
                </button>
              )}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}

              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/* ======================================== JIKA TIDAK TERAUTENTIKASI ======================================== */}
              {status === "unauthenticated" && (
                <button
                  disabled={isLoading}
                  onClick={() => {
                    setIsLoading(true);
                    signIn();
                  }}
                  className={`hover:text-gray-400 transall animate-squish ${
                    !isLoading && "clicked"
                  } disabled:!cursor-wait`}
                >
                  {isLoading ? "Loading..." : "Sign In"}
                </button>
              )}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
