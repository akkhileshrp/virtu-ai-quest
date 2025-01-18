import { UserButton, useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import MobileNavigation from "./mobile-navigation";

export default function Header() {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => setMenu(!menu);

  const { isSignedIn } = useUser();

  return (
    <header className="bg-secondary p-4 shadow-md flex md:flex-row md:justify-between items-center">
      <div className="flex items-center font-semibold">
        <Link to={"/"}>
          <img
            src="/favicon.ico"
            alt="logo"
            height={60}
            width={60}
            className="rounded-full"
          />
        </Link>
        <div className="flex flex-col ml-2">
          <Link to={"/"}>
            <h1 className="text-2xl title">VirtuAIQuest</h1>
            <p className="text-sm text-gray-500 ml-1">
              Empowering Careers Through AI
            </p>
          </Link>
        </div>
      </div>

      {isSignedIn ? (
        <nav className="mt-4 hidden md:mt-0 md:flex items-center gap-4 font-semibold">
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
      ) : (
        <Link to={"/sign-in"}>
          <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
        </Link>
      )}

      <div className="md:hidden text-gray-300" onClick={toggleMenu}>
        <MobileNavigation menu={menu} />
      </div>
    </header>
  );
}
