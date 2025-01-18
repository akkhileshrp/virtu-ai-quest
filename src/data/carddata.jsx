import React from "react";
import { User, Code, HelpCircle, Award } from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "10K+",
    label: "Active Users",
  },
  {
    value: "5M+",
    label: "Interviews Conducted",
  },
  {
    value: "98%",
    label: "Success Rate",
  },
  {
    value: "4.8/5",
    label: "User Rating",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <Code className="h-8 w-8 text-blue-600" />,
    title: "AI-Powered Mock Interviews",
    description:
      "Create mock interviews with AI-generated questions tailored to your role and preferences.",
  },
  {
    icon: <HelpCircle className="h-8 w-8 text-blue-600" />,
    title: "Attend Mock Interviews",
    description:
      "Participate in realistic mock interview sessions to practice and enhance your skills.",
  },
  {
    icon: <Award className="h-8 w-8 text-blue-600" />,
    title: "Feedback for Improvement",
    description:
      "Receive detailed feedback on your performance to help you improve and succeed in real interviews.",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <User className="h-8 w-8 text-blue-600" />,
    title: "1. Create Your Profile",
    description:
      "Fill in your details and preferences to tailor the mock interview experience to your needs",
  },
  {
    icon: <Code className="h-8 w-8 text-blue-600" />,
    title: "2. Choose Your Role & Interview Type",
    description:
      "Select the interview type, role, and difficulty to simulate your target job interview",
  },
  {
    icon: <HelpCircle className="h-8 w-8 text-blue-600" />,
    title: "3. Practice with AI",
    description:
      "Answer AI-generated questions and receive real-time feedback and recommendations",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "John Smith",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/79.jpg",
    quote:
      "The mock interviews with AI have been game-changing. I feel more confident and better prepared for my real interviews.",
  },
  {
    name: "Lisa Brown",
    role: "Data Scientist",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    quote:
      "The customizable questions feature is perfect for preparing for specific interviews. It’s like having a personal coach!",
  },
  {
    name: "David Lee",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/80.jpg",
    quote:
      "The instant feedback and improvement suggestions are incredibly valuable. I’ve seen noticeable improvements in my performance.",
  },
];

export const questionsData = [
  {
    id: "item-1",
    question: "What is VirtuAIQuest?",
    answer:
      "VirtuAIQuest is a platform that helps users prepare for job interviews with AI-generated questions tailored to their role, experience, and job description.",
  },
  {
    id: "item-2",
    question: "How does it work?",
    answer:
      "Simply input your job role, job description, and years of experience. The AI generates relevant questions, and you can answer them through voice. Get feedback and ratings after completing the session.",
  },
  {
    id: "item-3",
    question: "Is my data secure?",
    answer:
      "Yes, we prioritize your privacy and ensure that all data is securely stored and used only for improving your experience.",
  },
  {
    id: "item-4",
    question: "Can I review my performance?",
    answer:
      "Absolutely! After the mock interview, you can view detailed feedback and performance ratings to identify areas for improvement.",
  },
];
