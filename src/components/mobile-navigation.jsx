import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function MobileNavigation({ menu }) {
  const { isSignedIn } = useUser();

  return (
    <div className="ml-6">
      {isSignedIn && !menu && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
      {menu && (
        <div className="fixed top-0 right-0 w-3/4 h-screen bg-white shadow-lg z-50 transform transition-transform duration-300 translate-x-0">
          <div className="absolute top-4 right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 cursor-pointer"
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
            {["dashboard", "about", "questions", "howitworks"].map(
              (link, index) => (
                <NavLink
                  key={index}
                  to={`/${link}`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-bold border-b-2 border-blue-400"
                      : "text-gray-700 hover:text-blue-400"
                  }
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </NavLink>
              )
            )}
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-10 w-10",
                },
              }}
            />
          </nav>
        </div>
      )}
    </div>
  );
}
