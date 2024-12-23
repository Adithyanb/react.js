import React, { useState } from "react";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [textToUpload, setTextToUpload] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedItems, setUploadedItems] = useState([]);
  const [textToInteract, setTextToInteract] = useState("");
  const [interactionResult, setInteractionResult] = useState("");

  const handleFileSelection = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFileAndText = () => {
    const newItem = {
      id: Date.now(),
      fileName: selectedFile ? selectedFile.name : "Text Upload",
      fileType: selectedFile ? selectedFile.type : "text",
      uploadedAt: new Date().toLocaleString(),
      content: textToUpload || selectedFile?.name || "No content",
    };

    setUploadedItems((prev) => [...prev, newItem]);
    setTextToUpload("");
    setSelectedFile(null);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const deleteItem = (id) => {
    setUploadedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const interactWithText = () => {
    const mockResponse = `processed text: ${textToInteract}`;
    setInteractionResult(mockResponse);
    setTextToInteract("");
  };

  return (
    <div className="teacher-dashboard">
      <div className="header">
        
      </div>

      <div className="content">
        <div className="left-section">
          <h2 className="section-title">File Upload</h2>

          <div className="upload-controls">
            <input
              type="file"
              onChange={handleFileSelection}
              className="file-input"
              accept=".pdf"
            />
            <input
              type="text"
              value={textToUpload}
              onChange={(e) => setTextToUpload(e.target.value)}
              placeholder="Enter text to upload"
              className="text-input"
            />
            <button onClick={uploadFileAndText} className="upload-button">
              Upload
            </button>
          </div>

          <div className="uploaded-items">
            <h3 className="section-subtitle">Uploaded Items</h3>
            {uploadedItems.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-name">
                  {item.fileName} ({item.fileType})
                </div>
                <div className="item-date">Uploaded at: {item.uploadedAt}</div>
                <div className="item-content">{item.content}</div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

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
    </div>
  );
};

export default TeacherDashboard;
