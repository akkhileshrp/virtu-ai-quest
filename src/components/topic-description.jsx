import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function TopicDescription() {
  return (
    <div className="mx-20 lg:mx-44">
      <div className="mt-5">
        <Label>What topic you want to learn?</Label>
        <Input placeholder="Ex. Python, Java" className="mt-2" />
      </div>
      <div className="mt-5">
        <Label>Tell us more about your course</Label>
        <Textarea
          placeholder="Provide a detailed overview of the course, including key topics, learning objectives, and expected outcomes"
          className="mt-2"
        />
      </div>
    </div>
  );
}
