import React, { useEffect, useState } from "react";
import { getAllProblems } from "../firestore/problems";
import { submitAnswer } from "../firestore/submissions";
import { addUserPoints } from "../firestore/users";

const ProblemSolver = ({ user, userData, setUserData, problems }) => {
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
  
    // problems değiştiğinde index sıfırlanır
    useEffect(() => {
      setCurrentProblemIndex(0);
    }, [problems]);
  
    const handleSubmit = async () => {
      const problem = problems[currentProblemIndex];
      if (!problem) return;
  
      const isCorrect = userAnswer.trim() === problem.answer.toString().trim();
      const earnedScore = isCorrect ? 100 : 0;
  
      try {
        await submitAnswer({
          isCorrect,
          problemId: problem.uid,
          score: earnedScore,
          steps: [],
          userID: user.uid,
          answer: userAnswer,
        });
  
        if (earnedScore > 0) {
          await addUserPoints(user.uid, earnedScore);
          setUserData((prev) => ({
            ...prev,
            point: (prev?.point || 0) + earnedScore,
          }));
          alert(`Correct 🎉 Yeni puanınız: ${(userData?.point || 0) + earnedScore}`);
        } else {
          alert("Yanlış :( ❌");
        }
      } catch (error) {
        alert("Submission failed: " + error.message);
      }
  
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
  
