import { Blocks, FileCheck2, Lightbulb } from "lucide-react";
import Header from "../components/header";
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import CourseCategory from "../components/course-category";
import TopicDescription from "../components/topic-description";
import CourseDetails from "../components/course-details";

export default function CreateCourse() {
  const [active, setActive] = useState(0);
  const stepperOptions = [
    { id: 1, name: "Category", icon: <Blocks /> },
    { id: 2, name: "Topic & Desc", icon: <Lightbulb /> },
    { id: 3, name: "Options", icon: <FileCheck2 /> },
  ];

  return (
    <div>
      <Header />
      <div>
        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="text-4xl title font-bold">Create Course</h2>
          <div className="flex mt-10">
            {stepperOptions.map((option, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                  <div
                    className={`p-3 rounded-full text-white transition-all duration-300 ${
                      active >= index ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  >
                    {option.icon}
                  </div>
                  <h2 className="hidden md:block md:text-sm">{option.name}</h2>
                </div>
                {index !== stepperOptions.length - 1 && (
                  <div
                    className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] transition-all duration-300 ${
                      active - 1 >= index ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-10 md:px-20 lg:px-44 mt-10">
          {active === 0 ? (
            <CourseCategory />
          ) : active === 1 ? (
            <TopicDescription />
          ) : (
            <CourseDetails />
          )}
          <div className="flex justify-between mt-10">
            <Button
              onClick={() => setActive(active - 1)}
              disabled={active === 0}
              className="bg-blue-600 hover:bg-blue-700 px-10"
            >
              Prev
            </Button>
            {active < 2 ? (
              <Button
                onClick={() => setActive(active + 1)}
                className="bg-blue-600 hover:bg-blue-700 px-10"
              >
                Next
              </Button>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700 px-10">
                Generate Course Layout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
