import { db } from "../db";
import Header from "../components/header";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MockInterview } from "../db/schema";
import { eq } from "drizzle-orm";
import { WebcamIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import Webcam from "react-webcam";

export default function DynamicPage() {
  const { id } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [webcam, setWebcam] = useState(false);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, id));

    if (result.length === 0) return null;

    setInterviewData(result[0]);
  };

  return (
    <div>
      <Header />
      <div className="my-10 flex justify-center items-center flex-col px-6 md:px-8 text-black">
        <h2 className="title text-4xl font-semibold mb-6 text-center">
          Let&apos;s Get Started
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="p-6 rounded-lg shadow-lg">
            {interviewData ? (
              <>
                <h3 className="text-xl font-semibold mb-3">Job Details</h3>
                <div className="text-lg space-y-3">
                  <p>
                    <strong>Job Position</strong>
                    <br />
                    {interviewData.jobPosition}
                  </p>
                  <p>
                    <strong>Job Description</strong>
                    <br />
                    {interviewData.jobDesc}
                  </p>
                  <p>
                    <strong>Years of Experience</strong>
                    <br />
                    {interviewData.jobExperience}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-500">Loading interview data...</p>
            )}

            <div className="flex items-center mt-4">
              <div className="text-yellow-600">
                <p className="font-semibold">AI Mock Interview Instructions</p>
                <p className="mt-2">
                  <strong>
                    Enable webcam and microphone to start the AI mock interview.{" "}
                  </strong>
                  Your video will not be recorded. This mock interview is
                  designed to help you practice in a safe and private
                  environment. Once the interview is complete, a report will be
                  generated based on your performance.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg">
            {webcam ? (
              <>
                <Webcam
                  onUserMedia={() => setWebcam(true)}
                  onUserMediaError={() => setWebcam(false)}
                  mirrored={true}
                  style={{
                    height: "300px",
                    width: "300px",
                    borderRadius: "8px",
                  }}
                />
                <div className="flex justify-end items-end">
                  <Link to={"/interview/" + id + "/start"}>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                      Start Interview
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <WebcamIcon className="h-72 w-full my-7 p-4 rounded-lg" />
                <Button
                  onClick={() => setWebcam(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg mt-4 focus:outline-none"
                >
                  Enable Webcam and Microphone
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
