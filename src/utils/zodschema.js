import { z } from "zod";

export const interviewSchema = z.object({
  jobPosition: z
    .string()
    .min(1, "Job position is required")
    .max(100, "Job position must be less than 100 characters"),

  jobDescription: z
    .string()
    .min(1, "Job description is required")
    .max(300, "Job description must be less than 300"),

  yearsOfExperience: z
    .string()
    .min(1, "Years of experience is required")
    .max(52, "Years of experience must be less than or equal to 52"),
});
