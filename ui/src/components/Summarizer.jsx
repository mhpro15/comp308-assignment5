import { useState } from "react";
import "../styles/Summarizer.css";

function Summarizer() {
  const [articleText, setArticleText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!articleText.trim()) {
      setError("Please enter some text to summarize");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article: articleText }),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize article");
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError("An error occurred while summarizing. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setArticleText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="summarizer-container">
      <h2>AI Article Summarizer</h2>
      <p className="description">
        Enter text or upload a file to generate a summary using Google's Gemini
        AI.
      </p>

      <div className="input-section">
        <textarea
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
          placeholder="Paste your article text here or upload a file below..."
          rows={10}
        />

        <div className="file-upload">
          <label htmlFor="file-upload" className="file-upload-label">
            Upload Text File
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="file-input"
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        onClick={handleSummarize}
        disabled={isLoading || !articleText.trim()}
        className="summarize-button"
      >
        {isLoading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="summary-section">
          <h3>Summary</h3>
          <div className="summary-content">{summary}</div>
        </div>
      )}
    </div>
  );
}

export default Summarizer;
