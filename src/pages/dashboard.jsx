import { LoaderCircle, Plus } from "lucide-react";
import Header from "../components/header";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../components/ui/drawer";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { interviewSchema } from "../utils/zodschema";
import { chatSession } from "../utils/geminiai";
import { v4 as uuid } from "uuid";
import { db } from "../db";
import { MockInterview } from "../db/schema";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import PreviousInterview from "../components/previnterview";

export default function Dashboard() {
  const [open, setIsOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [airesponse, setAiResponse] = useState([]);
  const { user } = useUser();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      jobPosition: "",
      jobDescription: "",
      yearsOfExperience: "Fresher",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { jobPosition, jobDescription, yearsOfExperience } = data;

      const inputPrompt = `
        Job Position: ${jobPosition},
        Job Description: ${jobDescription},
        Years of Experience: ${yearsOfExperience}.
        Generate 10 interview questions with answers in JSON.
      `;

      const result = await chatSession.sendMessage(inputPrompt);
      const MockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      setAiResponse(MockJsonResp);

      if (MockJsonResp) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuid(),
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            jobExperience: yearsOfExperience,
            createdBy: user.primaryEmailAddress.emailAddress,
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          })
          .returning({ mockId: MockInterview.mockId });
        navigate("/interview/" + resp[0]?.mockId);
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      reset();
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="text-black min-h-screen my-10 rounded-lg">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="title text-4xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Create and Start your AI Mockup Interview{" "}
            <span className="font-semibold">
              {user.firstName} {user.lastName}
            </span>
          </p>
          <div className="p-10 w-[300px] md:w-[400px] mt-5 border border-gray-700 border-dashed rounded-lg transition-all hover:scale-105 cursor-pointer">
            <h2 onClick={() => setIsOpen(true)} className="text-lg text-center">
              <div className="flex flex-col items-center justify-center">
                <Plus className="h-10 w-10" /> Add New Interview
              </div>
            </h2>
          </div>

          <Drawer open={open} onOpenChange={setIsOpen}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Tell us more about your job interview</DrawerTitle>
                <DrawerDescription>
                  <h2>
                    Add details about your job position, job description, and
                    years of experience
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4 my-3 text-black">
                      <Label>Job Position</Label>
                      <Input
                        {...register("jobPosition")}
                        placeholder="Ex. Full Stack Developer"
                        className="mt-2"
                      />
                      {errors.jobPosition && (
                        <p className="text-red-500 text-sm">
                          {errors.jobPosition.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 my-3 text-black">
                      <Label>Job Description</Label>
                      <Textarea
                        {...register("jobDescription")}
                        placeholder="Ex. MongoDB, Express.js, React.js, Node.js"
                        className="mt-2"
                      />
                      {errors.jobDescription && (
                        <p className="text-red-500 text-sm">
                          {errors.jobDescription.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 my-3 text-black">
                      <Label>Years of Experience</Label>
                      <Input
                        {...register("yearsOfExperience")}
                        placeholder="Ex. Fresher or 2"
                        className="mt-2"
                      />
                      {errors.yearsOfExperience && (
                        <p className="text-red-500 text-sm">
                          {errors.yearsOfExperience.message}
                        </p>
                      )}
                    </div>
                  </form>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <div className="flex gap-3 justify-end">
                  {loading ? (
                    <Button disabled={loading}>
                      <LoaderCircle className="h-10 w-10 animate-spin" />
                      AI Cooking up some questions...
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleSubmit(onSubmit)}>
                        Start Interview
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsOpen(false);
                          reset();
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <PreviousInterview />
        </div>
      </div>
    </div>
  );
}
