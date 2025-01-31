import React, { useContext } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CourseInputContext } from "../context/course-context";

export default function TopicDescription() {
  const { userCourseInput, setUserCourseInput } =
    useContext(CourseInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-44">
      <div className="mt-5">
        <Label className="text-sm sm:text-base">
          What topic you want to learn?
        </Label>
        <Input
          placeholder="Ex. Python, Java"
          className="mt-2 w-full"
          onChange={(e) => handleInputChange("topic", e.target.value)}
          defaultValue={userCourseInput.topic}
        />
      </div>
      <div className="mt-5">
        <Label className="text-sm sm:text-base">
          Tell us more about your course
        </Label>
        <Textarea
          placeholder="Provide a detailed overview of the course, including key topics, learning objectives, and expected outcomes"
          className="mt-2 w-full"
          onChange={(e) => handleInputChange("description", e.target.value)}
          defaultValue={userCourseInput.description}
        />
      </div>
    </div>
  );
}
