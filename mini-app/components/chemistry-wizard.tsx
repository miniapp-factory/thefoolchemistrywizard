"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ChemistryWizard() {
  const [mode, setMode] = useState<keyof typeof questions | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bossActive, setBossActive] = useState<boolean>(false);
  const [bossQuestion, setBossQuestion] = useState<string>("");
  const [bossAnswer, setBossAnswer] = useState<string>("");

  const questions = {
    Theory: [
      { q: "What is the chemical formula for water?", a: "H₂O" },
      { q: "Name the compound with formula NaCl.", a: "Sodium chloride" },
    ],
    Solving: [
      { q: "Balance the equation: H₂ + O₂ → H₂O", a: "2 H₂ + O₂ → 2 H₂O" },
      { q: "Calculate the molar mass of CO₂.", a: "44 g/mol" },
    ],
    Quiz: [
      { q: "Which element has atomic number 79?", a: "Gold" },
      { q: "What is the most abundant gas in Earth's atmosphere?", a: "Nitrogen" },
    ],
  };

  const bossQuestions = {
    Theory: [
      { q: "Identify the oxidation state of iron in Fe₂O₃.", a: "III" },
    ],
    Solving: [
      { q: "Balance the redox reaction: KMnO₄ + H₂SO₄ + C₂H₅OH → K₂SO₄ + MnSO₄ + CO₂ + H₂O", a: "..." },
    ],
    Quiz: [
      { q: "Which element is a noble gas?", a: "Helium" },
    ],
  };

  const startScreen = (
    <main className="flex flex-col items-center gap-4 p-4">
      <img src="/logo.png" alt="Laughing wizard in jester hat" width={512} height={512} className="rounded-md" />
      <h1 className="text-3xl font-bold">THEFOOLCHEMISTRYWIZARD</h1>
      <p className="text-muted-foreground">Welcome to the Alchemists Lab.</p>
      <div className="flex flex-col gap-2">
        <Button onClick={() => setMode("Theory")}>1 The Magicians Theory</Button>
        <Button onClick={() => setMode("Solving")}>2 The Chariots Balance</Button>
        <Button onClick={() => setMode("Quiz")}>3 The Hermits Trivia</Button>
      </div>
    </main>
  );

  const questionScreen = (
    <main className="flex flex-col items-center gap-4 p-4">
      <img src="/logo.png" alt="Question" width={512} height={512} className="rounded-md" />
      <h2 className="text-2xl">{question}</h2>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-2 rounded"
      />
      <Button onClick={handleSubmit}>Submit</Button>
      {feedback && <p className="mt-4">{feedback}</p>}
      <div className="flex gap-2">
        <Button onClick={() => { setAnswer(""); setFeedback(""); setQuestion(""); setMode(null); }}>Menu</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </main>
  );

  const bossScreen = (
    <main className="flex flex-col items-center gap-4 p-4">
      <img src="/logo.png" alt="Boss" width={512} height={512} className="rounded-md" />
      <h2 className="text-2xl">{bossQuestion}</h2>
      <input
        type="text"
        value={bossAnswer}
        onChange={(e) => setBossAnswer(e.target.value)}
        className="border p-2 rounded"
      />
      <Button onClick={handleBossSubmit}>Submit</Button>
      {feedback && <p className="mt-4">{feedback}</p>}
      <div className="flex gap-2">
        <Button onClick={() => { setBossActive(false); setScore(0); setStreak(0); setMode(null); }}>Menu</Button>
        <Button onClick={handleBossNext}>Next</Button>
      </div>
    </main>
  );

  function handleSubmit() {
    const correct = question && answer.trim().toLowerCase() === questions[mode! as keyof typeof questions][0].a.toLowerCase();
    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);
      setFeedback("THE FOOL IS PLEASED! Score: " + (score + 1));
      if (streak + 1 === 5) {
        setBossActive(true);
        setBossQuestion(bossQuestions[mode!][0].q);
      }
    } else {
      setFeedback(`YOU STUMBLE IN IGNORANCE. Correct answer: ${questions[mode!][0].a}`);
      setStreak(0);
    }
  }

  function handleBossSubmit() {
    const correct = bossQuestion && bossAnswer.trim().toLowerCase() === bossQuestions[mode! as keyof typeof bossQuestions][0].a.toLowerCase();
    if (correct) {
      setScore(score + 5);
      setStreak(0);
      setFeedback(`Boss defeated! Bonus points awarded. Score: ${score + 5}`);
    } else {
      setFeedback(`The Guardian was too strong. Game Over. Final Score: ${score}`);
      setScore(0);
      setStreak(0);
      setMode(null);
    }
  }

  function handleNext() {
    const list = questions[mode! as keyof typeof questions];
    const next = list[Math.floor(Math.random() * list.length)];
    setQuestion(next.q);
    setAnswer("");
    setFeedback("");
  }

  function handleBossNext() {
    setBossActive(false);
    setMode(null);
  }

  if (bossActive) return bossScreen;
  if (!mode) return startScreen;
  if (!question) return questionScreen;
  return questionScreen;
}
