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
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAiResponse("");
    setIsOpen(false);
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

      <div className="flex gap-3">
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

        <Button onClick={() => setIsOpen(true)}>Ask AI For Help</Button>

        <Dialog open={open} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mock Interview Assistant</DialogTitle>
              <DialogDescription>
                Paste your interview questions below, and our AI will provide
                clear, concise, and professional answers to help you prepare.
                <div className="mt-3">
                  <Label className="text-black">Paste the Question</Label>
                  <Textarea
                    placeholder="Ask your doubts here!"
                    className="mt-2 text-black"
                    value={aiUserQuestion}
                  />
                  <Button
                    className="mt-3"
                    disabled={loading}
                    onClick={handleAiResponse}
                  >
                    {loading ? "Generating..." : "Get AI Answer"}
                  </Button>
                  <Button
                    variant="outline"
                    className="ml-3 text-black"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
                {aiResponse && (
                  <div
                    className="mt-5 bg-blue-100 p-4 rounded-md text-black"
                    style={{
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    <h4 className="font-semibold">AI Response:</h4>
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
