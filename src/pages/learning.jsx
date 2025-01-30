import { useUser } from "@clerk/clerk-react";
import Header from "../components/header";
import React from "react";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Learning = () => {
  const { user } = useUser();
  return (
    <div>
      <Header />
      <div className="text-black min-h-screen my-10 rounded-lg">
        <div className="max-w-7xl mx-auto px-6 py-12 flex md:flex-row flex-col justify-between ">
          <h1 className="title text-4xl font-bold">
            Keep Learning, Keep Growing!
            <p className="text-gray-500 text-sm font-normal mt-3">
              The journey of learning never ends. Keep challenging yourself, and
              remember,
              <br /> every step forward brings you closer to success{" "}
              <span className="font-semibold">
                {user.firstName} {user.lastName}!
              </span>
            </p>
          </h1>
          <Link to="/learning-path/create-course">
            <Button className="bg-blue-600 hover:bg-blue-700 md:mt-0 mt-5">
              <Plus />
              Create AI Course
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Learning;
