import { useContext } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { CourseInputContext } from "../context/course-context";

const categories = [
  { value: "Programming", label: "Programming" },
  { value: "Web Development", label: "Web Development" },
  { value: "App Development", label: "App Development" },
  { value: "Data Science", label: "Data Science" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  {
    value: "Artificial Intelligence & Machine Learning",
    label: "Artificial Intelligence & Machine Learning",
  },
  { value: "Cloud Computing", label: "Cloud Computing" },
  { value: "Design", label: "Design" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Business & Management", label: "Business & Management" },
  { value: "Finance & Accounting", label: "Finance & Accounting" },
  { value: "Personal Development", label: "Personal Development" },
  { value: "Health & Fitness", label: "Health & Fitness" },
  { value: "Music & Audio Production", label: "Music & Audio Production" },
  { value: "Language Learning", label: "Language Learning" },
  {
    value: "Photography & Video Editing",
    label: "Photography & Video Editing",
  },
];

const CourseCategory = () => {
  const { userCourseInput, setUserCourseInput } =
    useContext(CourseInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({ ...prev, category: category }));
  };

  return (
    <Select
      onValueChange={handleCategoryChange}
      defaultValue={userCourseInput.category}
     
    >
      <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent className="max-h-80 overflow-y-auto">
        {categories.map((category) => (
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CourseCategory;
