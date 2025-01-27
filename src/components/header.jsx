import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import MobileNavigation from "./mobile-navigation";

export default function Header() {
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
        <div className="text-gray-300">
          <MobileNavigation />
        </div>
      ) : (
        <>
          <Link to="/sign-in">
            <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
          </Link>
        </>
      )}
    </header>
  );
}
