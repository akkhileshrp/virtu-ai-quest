import { MockInterview } from "../db/schema";
import { db } from "../db";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { desc, eq } from "drizzle-orm";
import InterviewCard from "./interviewcard";

export default function PreviousInterview() {
  const { user } = useUser();

  const [loading, setIsLoading] = useState(false);
  const [interviewList, setInterviewList] = useState([]);
  const [noInterviews, setNoInterviews] = useState(false);

  useEffect(() => {
    if (user) getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user.primaryEmailAddress.emailAddress)
        )
        .orderBy(desc(MockInterview.id));

      if (result.length === 0) setNoInterviews(true);
      else setInterviewList(result);
    } catch (error) {
      console.error("Error while fetching interviews", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteInterview = async (mockId) => {
    try {
      const result = await db
        .delete(MockInterview)
        .where(eq(MockInterview.mockId, mockId));

      if (result.affectedRows > 0) {
        setInterviewList((prevList) =>
          prevList.filter((interview) => interview.mockId !== mockId)
        );
        if (interviewList.length === 1) setNoInterviews(true);
      } else {
        console.error("No interview deleted. Check the mockId.");
      }
    } catch (error) {
      console.error("Error deleting interview:", error);
    }
  };

  return (
    <div>
      <h2 className="title text-4xl font-bold mt-10">
        Previous Mock Interview
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : noInterviews ? (
        <p>No interviews found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {interviewList.map((interview, index) => (
            <InterviewCard
              key={index}
              interview={interview}
              onDelete={deleteInterview}
            />
          ))}
        </div>
      )}
    </div>
  );
}
