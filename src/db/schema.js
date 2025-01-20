import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp"),
  jobPosition: varchar("jobPosition"),
  jobDesc: varchar("jobDesc"),
  jobExperience: varchar("jobExperience"),
  createdBy: varchar("createdBy"),
  createdAt: text("createdAt"),
  mockId: varchar("mockId"),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});

export const AiAnswer = pgTable("aiAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId"),
  userQuestion: varchar("userQuestion"),
  aiAnswer: varchar("aiAnswer"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});
