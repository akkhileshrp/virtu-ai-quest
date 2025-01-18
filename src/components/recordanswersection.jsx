import { Mic, StopCircle, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { useUser } from "@clerk/clerk-react";
import useSpeechToText from "react-hook-speech-to-text";
import { chatSession } from "../utils/geminiai";
import { db } from "../db";
import { UserAnswer } from "../db/schema";
import moment from "moment";
import { toast } from "sonner";

export default function RecordAnswerSection({
  questions,
  activeQuestion,
  data,
}) {
  const [answer, setAnswer] = useState("");
  const [loading, setIsLoading] = useState(false);

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
    if (!isRecording && answer.length > 10) storeUserAnswer();
  }, [answer]);

  const startStopRecording = async () => {
    if (isRecording) stopSpeechToText();
    else startSpeechToText();
  };

  const storeUserAnswer = async () => {
    setIsLoading(true);
    const feedback =
      "Question:" +
      questions[activeQuestion]?.question +
      ", User Answer:" +
      answer +
      ", Depend on question and user answer please give us mark out of 10 for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedback);
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
      feedback: jsonFormatFeedback?.feedback,
      rating: jsonFormatFeedback?.rating,
      userEmail: user.primaryEmailAddress.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if(userAnswers) {
      toast.success("User answer recorded successfully");
      setAnswer("");
      setResults([]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col my-5 justify-center items-center rounded-lg p-5">
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
}
