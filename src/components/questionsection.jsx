import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

export default function QuestionSection({ questions, activeQuestion }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      <p>Sorry, Your browser does not support text to speech.</p>;
    }
  };
  return (
    <div className="p-5 border rounded-lg my-10 mx-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {questions &&
          questions.map((questions, index) => (
            <h2
              key={index}
              className={`p-2 rounded-full border text-center text-xs md:text-sm cursor-pointer ${
                activeQuestion === index && "bg-blue-500 text-white"
              }`}
            >
              Question: {index + 1}
            </h2>
          ))}
      </div>

      <h2 className="my-9 text-md font-semibold md:text-lg">
        {activeQuestion + 1}. {questions[activeQuestion]?.question}
      </h2>

      <h2
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => textToSpeech(questions[activeQuestion]?.question)}
      >
        <Volume2 />
        Click to Speak
      </h2>

      <div className="border rounded-lg p-5 bg-yellow-100 mt-4">
        <h2 className="flex gap-2 items-center text-blue-500">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-blue-600 my-2 text-sm">
          Click on Record answer when you want to answer the question. At the
          end of interview we will give you the feedback along with correct
          answer for each of question and your answer to compare it.
        </h2>
      </div>
    </div>
  );
}
