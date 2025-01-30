import { UserButton, useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function MobileNavigation() {
  const { isSignedIn, user } = useUser();
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => setMenu(!menu);

  return (
    <div className="ml-6">
      {isSignedIn && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 cursor-pointer"
          onClick={toggleMenu}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
      <div
        className={`fixed top-0 right-0 w-2/3 md:w-1/3 h-screen bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${
          menu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute top-4 right-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 cursor-pointer"
            onClick={toggleMenu}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <nav className="space-y-4 font-semibold flex flex-col mt-12 px-6">
          <h1 className="text-gray-700">Main Menu</h1>
          <hr />

          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-bold border-b-2 w-40 border-blue-400"
                : "text-gray-700 hover:text-blue-400"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to={"/about"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-bold border-b-2 w-40 border-blue-400"
                : "text-gray-700 hover:text-blue-400"
            }
          >
            Our Mission
          </NavLink>

          <NavLink
            to={"/questions"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-bold border-b-2 w-40 border-blue-400"
                : "text-gray-700 hover:text-blue-400"
            }
          >
            FAQ
          </NavLink>
          <NavLink
            to={"/how-it-works"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-bold border-b-2 w-40 border-blue-400"
                : "text-gray-700 hover:text-blue-400"
            }
          >
            Getting Started
          </NavLink>
          <NavLink
            to={"/learning-path"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-bold border-b-2 w-40 border-blue-400"
                : "text-gray-700 hover:text-blue-400"
            }
          >
            Skill Builder
          </NavLink>
          <NavLink
            to={"/cover-letter"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-bold border-b-2 w-40 border-blue-400"
                : "text-gray-700 hover:text-blue-400"
            }
          >
            Smart Cover Letter
          </NavLink>
          <hr />
          <h1 className="text-gray-700">My Profile</h1>
          <div className="flex">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-10 w-10",
                },
              }}
            />
            <div className="flex flex-col ml-4">
              <span className="text-xs text-gray-700 font-normal">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-xs text-gray-700 font-normal">
                {user.primaryEmailAddress.emailAddress}
              </span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
