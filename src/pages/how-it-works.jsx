import { Button } from "../components/ui/button";
import Header from "../components/header";
import React from "react";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  return (
    <div>
      <Header />
      <div className="text-black min-h-screen my-10 rounded-lg">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold title mb-6">How It Works</h1>

          <p className="text-lg leading-relaxed mb-6">
            <span className="title font-semibold">VirtuAIQuest</span> provides a
            seamless and effective way to prepare for interviews by simulating
            real-world scenarios. Here’s how you can get started:
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Step 1: Enter Your Basic Details
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Begin by entering your position, job role, years of experience,
              and any specific job description. This helps our AI understand
              your needs and tailor the interview questions specifically for
              you.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Step 2: AI Prepares Customized Questions
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Once you submit your details, our AI generates a set of customized
              interview questions relevant to your role and experience. This
              ensures that your practice sessions are targeted and effective.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Step 3: Enable Webcam and Microphone
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              To create a realistic interview experience, you’ll need to enable
              your webcam and microphone. This allows you to simulate answering
              questions in a live interview setting while the platform records
              your responses.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Step 4: Answer Questions
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              The AI will display one question at a time on your screen. Record
              your answers using the webcam and microphone. Take your time to
              structure your responses as you would in a real interview.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Step 5: Receive Feedback
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              After completing your session, you’ll receive detailed feedback on
              your performance. Our AI will highlight areas of improvement and
              provide actionable suggestions to help you refine your skills.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-lg leading-relaxed">
              Take control of your interview preparation with{" "}
              <span className="title font-semibold">VirtuAIQuest</span>. Sign up
              now and experience personalized, AI-driven interview practice
              designed to help you excel.
            </p>

            <div className="mt-10">
              <Link to={"/dashboard"}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Start Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
