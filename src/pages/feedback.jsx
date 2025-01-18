import { db } from "../db";
import Header from "../components/header";
import React, { useEffect, useState } from "react";
import { UserAnswer } from "../db/schema";
import { eq } from "drizzle-orm";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

export default function Feedback() {
  const { id } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getFeedbackDetails();
  }, []);

  const getFeedbackDetails = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, id))
      .orderBy(UserAnswer.id);

    setFeedbacks(result);
    calculateAvgRating(result);
  };

  const calculateAvgRating = (feedbacks) => {
    if (feedbacks.length === 0) {
      setAvgRating(0);
      return;
    }

    const totalRating = feedbacks.reduce(
      (sum, feedback) => sum + Number(feedback.rating),
      0
    );
    setAvgRating(totalRating);
  };

  return (
    <div>
      <Header />
      <div className="p-10">
        {feedbacks.length === 0 ? (
          <>
            <h2 className="font-bold mt-5">No Feedback found.</h2>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 mt-3"
            >
              Go to Home
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-green-500">
              Boom! You Nailed It!
            </h2>

            <p className="text-2xl font-semibold">
              Here is your interview feedback
            </p>

            <p className="text-green-700 mt-2">
              Your overall interview rating:{" "}
              <span className="font-bold">{avgRating}</span> out of{" "}
              <span className="font-bold">100</span>
            </p>

            {feedbacks &&
              feedbacks.map((feedback, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="p-2 w-full border rounded-lg flex justify-between my-2 text-left gap-7">
                    {feedback.question} <ChevronsUpDown className="h-5 w-5" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="rounded-lg p-2">
                    <div className="flex flex-col gap-2">
                      <h2 className="p-2 bg-red-400 text-white rounded-lg font-bold w-28">
                        Rating: {feedback.rating}
                      </h2>
                      <h2 className="p-2 rounded-lg bg-red-50 text-sm text-red-900 font-bold capitalize">
                        Your Answer: {feedback.userAns}
                      </h2>
                      <h2 className="p-2 rounded-lg bg-green-50 text-sm text-green-900 font-bold capitalize">
                        Correct Answer: {feedback.correctAns}
                      </h2>
                      <h2 className="p-2 rounded-lg bg-violet-300 text-sm font-bold capitalize">
                        Feedback: {feedback.feedback}
                      </h2>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}

            <Button
              className="bg-blue-600 hover:bg-blue-700 ml-2 my-2"
              onClick={() => navigate("/dashboard")}
            >
              Go To Home
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
