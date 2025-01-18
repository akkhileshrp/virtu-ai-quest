import Header from "../components/header";
import React from "react";

export default function About() {
  return (
    <div>
      <Header />
      <div className="text-black min-h-screen my-10 rounded-lg">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold title mb-6">About Us</h1>

          <p className="text-lg leading-relaxed mb-6">
            Welcome to{" "}
            <span className="title font-semibold">VirtuAIQuest</span>,
            your ultimate preparation tool for acing your interviews. Our
            application leverages advanced AI technology to provide tailored
            interview experiences based on your job role, job description, and
            years of experience. Whether you're a fresher or a seasoned
            professional, we help you practice and improve your skills.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            With features like voice-based answering, real-time feedback, and
            performance ratings, our goal is to build your confidence and
            enhance your readiness for any interview. Our application is
            designed to simulate real-world interview scenarios, offering you an
            immersive experience.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            At{" "}
            <span className="title font-semibold">VirtuAIQuest</span>,
            we believe in empowering job seekers to achieve their career goals.
            Join thousands of users already benefiting from our intuitive,
            smart, and user-friendly platform.
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>AI-driven, customized interview questions.</li>
              <li>Interactive voice-based mock interviews.</li>
              <li>Detailed feedback and performance ratings.</li>
              <li>Accessible anytime, anywhere.</li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed">
              To empower individuals with the tools and confidence needed to
              succeed in their professional journeys. We aim to bridge the gap
              between job seekers and their dream roles by providing practical,
              hands-on interview preparation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
