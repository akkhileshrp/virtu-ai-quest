import React, { useContext } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { CourseInputContext } from "../context/course-context";

export default function CourseDetails() {
  const { userCourseInput, setUserCourseInput } =
    useContext(CourseInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        <div>
          <Label className="text-sm sm:text-base">Difficulty Level</Label>
          <div className="mt-2">
            <Select
              onValueChange={(value) => handleInputChange("difficulty", value)}
              defaultValue={userCourseInput.difficulty}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advance">Advance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-sm sm:text-base">Course Duration</Label>
          <div className="mt-2">
            <Select
              onValueChange={(value) => handleInputChange("duration", value)}
              defaultValue={userCourseInput.duration}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 Hour">1 Hour</SelectItem>
                <SelectItem value="2 Hour">2 Hour</SelectItem>
                <SelectItem value="More than 3 Hour">
                  More than 3 Hour
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-sm sm:text-base">Add Video</Label>
          <div className="mt-2">
            <Select
              onValueChange={(value) => handleInputChange("video", value)}
              defaultValue={userCourseInput.video}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Video Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-sm sm:text-base">No. of Chapters</Label>
          <Input
            type="number"
            placeholder="Enter No. of Chapters"
            className="mt-2 w-full"
            onChange={(e) => handleInputChange("chapters", e.target.value)}
            defaultValue={userCourseInput.chapters}
          />
        </div>
      </div>
    </div>
  );
}
