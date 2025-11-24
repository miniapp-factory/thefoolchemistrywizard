"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ChemistryWizard() {
  const [challenge, setChallenge] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const handleSelect = (type: string) => {
    setChallenge(type);
    setFeedback(`You selected ${type}. Good luck!`);
  };

  return (
    <main className="flex flex-col items-center gap-4 p-4">
      <img
        src="/logo.png"
        alt="Chemistry wizard logo"
        width={512}
        height={512}
        className="rounded-md"
      />
      <h1 className="text-3xl font-bold">The Fools Chemical Formula Wizard</h1>
      <p className="text-muted-foreground">
        Choose your challenge:
      </p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => handleSelect("Theory")}>
          Theory
        </Button>
        <Button variant="outline" onClick={() => handleSelect("Solving")}>
          Solving
        </Button>
        <Button variant="outline" onClick={() => handleSelect("Quiz")}>
          Multiple Choice Quiz
        </Button>
      </div>
      {feedback && (
        <p className="mt-4 text-green-600 font-medium">{feedback}</p>
      )}
    </main>
  );
}
