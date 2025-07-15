import React, { useEffect, useState } from "react";
import { getAllProblems } from "../firestore/problems";
import { submitAnswer } from "../firestore/submissions";

const ProblemSolver = ({ user }) => {
  const [problems, setProblems] = useState([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");

  useEffect(() => {
    getAllProblems().then(setProblems);
  }, []);

  const handleSubmit = () => {
    const problem = problems[currentProblemIndex];
    const isCorrect = userAnswer.trim() === problem.answer.toString().trim();

    submitAnswer({
      userId: user.uid,
      problemId: problem.uid,
      answer: userAnswer,
      isCorrect,
    });

    alert(isCorrect ? "Correct 🎉" : "Wrong ❌");

    setUserAnswer("");
    setCurrentProblemIndex((prev) => (prev + 1) % problems.length);
  };

  if (problems.length === 0) return <p>Loading questions...</p>;

  const currentProblem = problems[currentProblemIndex];

  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <h3>Problem:</h3>
      <p>{currentProblem.content}</p>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter your answer"
        style={{ padding: "10px", width: "200px" }}
      />
      <div>
        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProblemSolver;
