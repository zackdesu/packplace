"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const path = usePathname();

  return (
    <nav className="flex bg-slate-800 text-white justify-around items-center w-full px-[20px] py-[10px] mb-[20px] shadow-md">
      <h1 className="cursor-pointer text-4xl font-semibold">PackPlace</h1>
      <div className="menu">
        <ul className="flex justify-between text-gray-400">
          <li>
            <Link
              href="/"
              className={
                path === "/" || path === "/login" || path === "/signup"
                  ? "text-white mx-5"
                  : "hover:text-white mx-5"
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/features"
              className={
                path.includes("/features")
                  ? "text-white mx-5"
                  : "hover:text-white mx-5"
              }
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={
                path.includes("/about")
                  ? "text-white mx-5"
                  : "hover:text-white mx-5"
              }
            >
              About
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex items-center">
          <li className="m-[1.5vw]">
            <a href="/login" className="log-in">
              Log In
            </a>
          </li>
          <li className="m-[1.5vw] bg-red-600 py-1 px-3 rounded-lg ease-in duration-300 hover:shadow-custom">
            <a href="/signup" className="sign-up">
              Sign Up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
