import { Button } from "../components/ui/button";
import { Mic, StopCircle, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { chatSession } from "../utils/geminiai";
import { db } from "../db";
import { AiAnswer, UserAnswer } from "../db/schema";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const RecordAnswerSection = ({ questions, activeQuestion, data }) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const { user } = useUser();
  const aiUserQuestion = questions[activeQuestion]?.question || "";

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      const concatenatedResults = results
        .map((result) => result.transcript)
        .join(" ");
      setAnswer(concatenatedResults);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && answer.length > 10) {
      storeUserAnswer();
    }
  }, [isRecording, answer]);

  const startStopRecording = async () => {
    if (isRecording) stopSpeechToText();
    else startSpeechToText();
  };

  const storeUserAnswer = async () => {
    if (!answer || answer.length <= 10) {
      toast.error("Answer is too short. Please provide a valid response.");
      return;
    }

    try {
      setLoading(true);
      const feedBackPrompt =
        `Question: ${questions[activeQuestion]?.question}, ` +
        `User answer: ${answer}. ` +
        `Based on the question and answer, provide a rating out of 10 ` +
        `and feedback for improvement in JSON format with fields 'rating' and 'feedback'.`;

      const result = await chatSession.sendMessage(feedBackPrompt);
      const response = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      const jsonFormatFeedback = JSON.parse(response);

      await db.insert(UserAnswer).values({
        mockIdRef: data.mockId,
        question: questions[activeQuestion]?.question,
        correctAns: questions[activeQuestion]?.answer,
        userAns: answer,
        feedback: jsonFormatFeedback?.feedback || "No feedback provided.",
        rating: jsonFormatFeedback?.rating || 0,
        userEmail: user.primaryEmailAddress.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      toast.success("User answer recorded successfully.");
      setAnswer("");
      setResults([]);
    } catch (error) {
      console.error("Error storing user answer:", error);
      toast.error("Failed to store the answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatAIResponse = (response) => {
    const cleanResponse = response
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br>");
    return <div dangerouslySetInnerHTML={{ __html: cleanResponse }} />;
  };

  const handleAiResponse = async () => {
    if (!aiUserQuestion.trim()) {
      toast.error("Question is empty. Please provide a valid question");
      return;
    }

    try {
      setLoading(true);
      const response = await chatSession.sendMessage(aiUserQuestion);
      const aiResult = response.response.text();
      await db.insert(AiAnswer).values({
        mockIdRef: data.mockId,
        userQuestion: aiUserQuestion,
        aiAnswer: aiResult,
        userEmail: user.primaryEmailAddress.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });
      setAiResponse(aiResult);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate AI answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAiResponse("");
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center flex-col bg-white rounded-3xl p-6 md:p-12 mt-12 bg-gradient-to-br from-purple-50 to-blue-50 shadow-md mx-4 md:mr-10">
      <div className="relative w-full rounded-lg overflow-hidden mb-5 border-2 border-gray-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-transparent opacity-40 pointer-events-none"></div>
        <Webcam
          mirrored={true}
          style={{
            height: "50vh",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <WebcamIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 md:h-16 md:w-16 text-gray-400 opacity-40" />
      </div>

      <div className="flex justify-center flex-col md:flex-row gap-3 mt-5 w-full">
        <Button
          variant="outline"
          className="text-black mb-6 bg-gradient-to-r from-blue-200 to-blue-100 hover:from-blue-300 hover:to-blue-200 transition-colors duration-300 w-full md:w-auto"
          onClick={startStopRecording}
          disabled={loading}
        >
          {isRecording ? (
            <h2 className="flex items-center justify-center gap-2 text-red-600 animate-pulse">
              <StopCircle />
              Stop Recording
            </h2>
          ) : (
            <h2 className="flex items-center justify-center gap-2">
              <Mic />
              Start Recording
            </h2>
          )}
        </Button>
        <Button
          className="bg-gradient-to-r from-green-400 to-green-200 hover:from-green-500 hover:to-green-300 text-white transition-colors duration-300 w-full md:w-auto"
          onClick={() => setIsOpen(true)}
          disabled={loading}
        >
          Ask AI for Help
        </Button>

        <Dialog open={open} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-[90vw] md:max-w-md">
            <DialogHeader>
              <DialogTitle>Mock Interview Assistant</DialogTitle>
              <DialogDescription>
                Paste your interview questions below, and our AI will provide
                clear, concise, and professional answers to help you prepare.
                <div className="mt-3">
                  <Label className="text-gray-700 block mb-2">
                    Paste the Question
                  </Label>
                  <Textarea
                    placeholder="Ask your doubts here!"
                    className="mt-2 text-black w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 p-2"
                    value={aiUserQuestion}
                    readOnly={true}
                  />
                  <div className="mt-3 flex flex-col md:flex-row gap-2">
                    <Button
                      className="bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-600 hover:to-blue-400 text-white transition-colors duration-300 w-full md:w-auto"
                      disabled={loading}
                      onClick={handleAiResponse}
                    >
                      {loading ? "Generating..." : "Get AI Answer"}
                    </Button>
                    <Button
                      variant="outline"
                      className="text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors duration-300 w-full md:w-auto"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
                {aiResponse && (
                  <div className="mt-5 bg-gray-50 p-4 rounded-md text-black overflow-y-auto max-h-[50vh] border border-gray-200">
                    <h4 className="font-semibold text-gray-800">
                      AI Response:
                    </h4>
                    <div>{formatAIResponse(aiResponse)}</div>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RecordAnswerSection;
