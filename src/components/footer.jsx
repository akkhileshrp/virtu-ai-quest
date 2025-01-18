import React from "react";

export default function Footer() {
  return (
    <footer className="relative bottom-0 p-6 bg-blue-100">
      <div className="text-center">&copy; {new Date().getFullYear()} VirtuAIQuest. All Rights Reserved</div>
    </footer>
  );
}
