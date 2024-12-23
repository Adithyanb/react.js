import React, { useState } from "react";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [textToInteract, setTextToInteract] = useState("");
  const [interactionResult, setInteractionResult] = useState("");

  const interactWithText = () => {
    const mockResponse = `processed tetx: ${textToInteract}`;
    setInteractionResult(mockResponse);
    setTextToInteract("");
  };

  return (
    <div className="student-dashboard">
      <div className="right-section">
        <div className="answer-box">
          <h3 className="section-subtitle">Retrieved Answer</h3>
          <div className="answer-content">
            {interactionResult || "No response yet"}
          </div>
        </div>

        <div className="interaction-controls">
          <input
            type="text"
            value={textToInteract}
            onChange={(e) => setTextToInteract(e.target.value)}
            placeholder="Enter text to interact"
            className="text-input"
          />
          <button onClick={interactWithText} className="submit-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;