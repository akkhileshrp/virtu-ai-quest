import { Link, useParams } from "react-router-dom";
import Header from "../components/header";
import React, { useEffect, useState } from "react";
import { db } from "../db";
import { MockInterview } from "../db/schema";
import { eq } from "drizzle-orm";
import QuestionSection from "../components/questionsection";
import RecordAnswerSection from "../components/recordanswersection";
import { Button } from "../components/ui/button";

export default function Start() {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setIsActive] = useState(0);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, id));

      if (result.length === 0) {
        setLoading(false);
        return;
      }

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setQuestions(jsonMockResp.interviewQuestions || []);
      setData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {Array.isArray(questions) && questions.length > 0 ? (
            <QuestionSection
              questions={questions}
              activeQuestion={activeQuestion}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 text-center">
                No questions available.
              </p>
            </div>
          )}
          <div className="relative">
            <RecordAnswerSection
              questions={questions}
              activeQuestion={activeQuestion}
              data={data}
            />
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:static md:bg-transparent md:shadow-none mt-3 p-4 md:p-0">
              <div className="flex justify-end gap-2 md:gap-3">
                {activeQuestion > 0 && Array.isArray(questions) && (
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white w-24 md:w-32 lg:w-36 px-2 md:px-4 py-1 md:py-2 text-sm md:text-base"
                    onClick={() => setIsActive(activeQuestion - 1)}
                  >
                    Previous
                  </Button>
                )}
                {Array.isArray(questions) &&
                  activeQuestion !== questions.length - 1 && (
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white w-24 md:w-32 lg:w-36 px-2 md:px-4 py-1 md:py-2 text-sm md:text-base"
                      onClick={() => setIsActive(activeQuestion + 1)}
                    >
                      Next
                    </Button>
                  )}
                {Array.isArray(questions) &&
                  activeQuestion === questions.length - 1 && (
                    <Link to={`/interview/${id}/feedback`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white w-24 md:w-32 lg:w-36 px-2 md:px-4 py-1 md:py-2 text-sm md:text-base">
                        End
                      </Button>
                    </Link>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
