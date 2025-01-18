import { Button } from "../components/ui/button";
import { db } from "../db";
import { MockInterview } from "../db/schema";
import { eq } from "drizzle-orm";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const InterviewCard = ({ interview, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deletePrevInterview = async () => {
    try {
      setLoading(true);
      const result = await db
        .delete(MockInterview)
        .where(eq(MockInterview.mockId, interview?.mockId));

      if (result) {
        toast.success("Interview deleted successfully!");
        onDelete(interview.mockId);
      } else {
        toast.error("Failed to delete the interview. Try again.");
      }
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("An error occurred while deleting.");
    } finally {
      setLoading(false);
    }
  };

  const startBtn = () => navigate("/interview/" + interview?.mockId);

  const feedbackBtn = () =>
    navigate("/interview/" + interview?.mockId + "/feedback");

  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-500">
        Years of Experience: {interview?.jobExperience}
      </h2>
      <h2 className="text-xs text-gray-500">
        Created At: {interview?.createdAt}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={feedbackBtn}>
          Feedback
        </Button>
        {loading ? (
          <Button variant="destructive" className="text-white" disabled>
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Deleting...
          </Button>
        ) : (
          <Button
            variant="destructive"
            className="text-white"
            onClick={deletePrevInterview}
          >
            Delete
          </Button>
        )}
        <Button variant="outline" className="text-black" onClick={startBtn}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewCard;
