import React from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

export default function CourseDetails() {
  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <Label>Difficulty Level</Label>
          <div className="mt-2">
            <Select>
              <SelectTrigger>
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
          <Label>Course Duration</Label>
          <div className="mt-2">
            <Select>
              <SelectTrigger>
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
          <Label>Add Video</Label>
          <div className="mt-2">
            <Select>
              <SelectTrigger>
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
          <Label>No. of Chapters</Label>
          <Input
            type="number"
            placeholder="Enter No. of Chapters"
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
}
