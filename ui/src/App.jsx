import "./App.css";
import Summarizer from "./components/Summarizer";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI Article Summarizer</h1>
        <p>Powered by Google's Gemini AI</p>
      </header>

      <main>
        <Summarizer />
      </main>

      <footer className="app-footer">
        <p>© 2024 AI Article Summarizer</p>
      </footer>
    </div>
  );
}

export default App;
