import { questionsData } from "../data/carddata";
import Header from "../components/header";
import React from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function Questions() {
  return (
    <div>
      <Header />
      <div className="min-h-screen my-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold title mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg leading-relaxed mb-8">
            At <span className="title font-semibold">VirtuAIQuest</span>, we
            understand the challenges job seekers face when preparing for
            interviews. Our platform is designed to provide a seamless and
            effective way to practice and improve your interview skills. Here,
            you can find answers to some common questions about how our platform
            works and how it can help you.
          </p>

          <Accordion type="single" collapsible>
            {questionsData.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-lg font-semibold text-black">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-black">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg leading-relaxed">
              If you have any additional questions or need further assistance,
              feel free to reach out to our support team. We are here to help
              you make the most out of your interview preparation journey.
            </p>
            <div className="mt-6">
              <Link
                to="mailto:akkhileshrp2003@gmail.com"
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
