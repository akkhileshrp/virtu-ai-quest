import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

const categories = [
  { value: "programming", label: "Programming" },
  { value: "web-development", label: "Web Development" },
  { value: "data-science", label: "Data Science" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "ai-ml", label: "Artificial Intelligence & Machine Learning" },
  { value: "cloud-computing", label: "Cloud Computing" },
  { value: "design", label: "Design" },
  { value: "ui-ux", label: "UI/UX Design" },
  { value: "marketing", label: "Digital Marketing" },
  { value: "business", label: "Business & Management" },
  { value: "finance", label: "Finance & Accounting" },
  { value: "personal-development", label: "Personal Development" },
  { value: "health-fitness", label: "Health & Fitness" },
  { value: "music", label: "Music & Audio Production" },
  { value: "photography", label: "Photography & Video Editing" },
  { value: "language-learning", label: "Language Learning" },
];

const CourseCategory = () => {
  return (
    <Select>
      <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
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
