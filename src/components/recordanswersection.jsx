import { Button } from "../components/ui/button";
import { Mic, StopCircle, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { chatSession } from "../utils/geminiai";
import { db } from "../db";
import { UserAnswer } from "../db/schema";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";

const RecordAnswerSection = ({ questions, activeQuestion, data }) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
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

      const userAnswers = await db.insert(UserAnswer).values({
        mockIdRef: data.mockId,
        question: questions[activeQuestion]?.question,
        correctAns: questions[activeQuestion]?.answer,
        userAns: answer,
        feedback: jsonFormatFeedback?.feedback || "No feedback provided.",
        rating: jsonFormatFeedback?.rating || 0,
        userEmail: user.primaryEmailAddress.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      if (userAnswers) {
        toast.success("User answer recorded successfully.");
        setAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.error("Error storing user answer:", error);
      toast.error("Failed to store the answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col my-5 justify-center bg-black items-center rounded-lg p-5">
        <WebcamIcon className="h-60 w-60 absolute" />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button
        variant="outline"
        className="text-black mb-6"
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
    </div>
  );
};

export default RecordAnswerSection;
