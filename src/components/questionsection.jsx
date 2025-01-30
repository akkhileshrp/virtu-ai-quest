import { Lightbulb, Volume2 } from "lucide-react";
import React, { useState } from "react";

export default function QuestionSection({ questions, activeQuestion }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.onstart = () => setIsSpeaking(true);
      speech.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl shadow-lg my-10 mx-4 md:mx-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {questions &&
          questions.map((question, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl shadow-md transition-all duration-300 cursor-pointer ${
                activeQuestion === index
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white transform scale-105"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <h2 className="text-center text-sm md:text-base font-medium">
                Question {index + 1}
              </h2>
            </div>
          ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          {activeQuestion + 1}. {questions[activeQuestion]?.question}
        </h2>

        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            isSpeaking
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }`}
          onClick={() => textToSpeech(questions[activeQuestion]?.question)}
          disabled={isSpeaking}
        >
          <Volume2 size={16} />
          {isSpeaking ? "Speaking..." : "Click to Speak"}
        </button>
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-blue-600">Note:</h2>
        </div>
        <p className="text-sm text-gray-700">
          Click on "Record Answer" when you're ready to respond. At the end of
          the interview, we'll provide detailed feedback, including the correct
          answers and a comparison with your responses.
        </p>
      </div>
    </div>
  );
}
