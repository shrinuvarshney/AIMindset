// PERSONAL AI LEARNING SYSTEM – STABLE VERSION (ERROR-FIXED)
// UI rebuilt + subtopics added + runtime errors removed

import { useState, useEffect } from "react";

/* ---------------- ROADMAP TEXT (UNCHANGED) ---------------- */
const roadmapText = `Most roadmaps felt too shallow or too scattered. That’s why I created this one to walk you through exactly what to study, what to build, and how to think like someone who actually works in AI.
This is the roadmap I wish someone gave me. Just real projects, the skills that matter, and the reflection prompts to help you track your progress.

📌 How to Use This Tracker
This is an 8-week self-paced AI/ML learning system.

📅 WEEK 1: Python, Pandas, and NumPy
📅 WEEK 2: Intro to Machine Learning
📅 WEEK 3: Structured ML & Messy Data
📅 WEEK 4: End-to-End ML & Deployment
📅 WEEK 5: GenAI Foundations
📅 WEEK 6: Real GenAI Applications
📅 WEEK 7: Agent Workflows
📅 WEEK 8: Final Capstone`;

/* ---------------- ROADMAP DATA ---------------- */
const roadmap = [
  {
    week: 1,
    title: "Python, Pandas & NumPy",
    project: "Music Trends Analysis",
    subtopics: [
      "Python basics (loops, functions, data types)",
      "Reading CSV / Excel files",
      "NumPy arrays & vectorization",
      "Pandas DataFrames & Series",
      "Data cleaning",
      "Basic EDA",
      "Simple visualizations"
    ]
  },
  {
    week: 2,
    title: "Intro to Machine Learning",
    project: "Loan Default Prediction",
    subtopics: [
      "Supervised learning concept",
      "Train-test split",
      "Features vs target",
      "Logistic Regression intuition",
      "Random Forest basics",
      "Overfitting vs underfitting",
      "Evaluation metrics"
    ]
  },
  {
    week: 3,
    title: "Messy Data & Feature Engineering",
    project: "Hospital Readmission ML",
    subtopics: [
      "Handling missing data",
      "Categorical encoding",
      "Feature scaling",
      "Class imbalance",
      "Feature selection",
      "XGBoost intuition",
      "Model explainability"
    ]
  },
  {
    week: 4,
    title: "End-to-End ML + Deployment",
    project: "Salary Prediction App",
    subtopics: [
      "Pipeline thinking",
      "Saving/loading models",
      "Input validation",
      "Streamlit / Gradio UI",
      "Explaining predictions",
      "Basic deployment ideas"
    ]
  },
  {
    week: 5,
    title: "GenAI Foundations",
    project: "Research Paper Assistant",
    subtopics: [
      "What are LLMs",
      "Prompt design",
      "Embeddings intuition",
      "Vector databases",
      "Semantic search",
      "RAG concept",
      "Hallucination handling"
    ]
  },
  {
    week: 6,
    title: "Real GenAI Applications",
    project: "Resume Skill Matcher",
    subtopics: [
      "Problem framing",
      "Prompt chaining",
      "Function calling",
      "Parsing unstructured text",
      "Designing AI outputs",
      "Handling edge cases"
    ]
  },
  {
    week: 7,
    title: "Agent Workflows",
    project: "Meeting Assistant",
    subtopics: [
      "What is an agent",
      "Tool usage",
      "Memory & context",
      "Multi-step reasoning",
      "Failure handling",
      "When not to use agents"
    ]
  },
  {
    week: 8,
    title: "Final Capstone",
    project: "Smart Career Advisor",
    subtopics: [
      "System design thinking",
      "Combining ML + GenAI",
      "Data flow planning",
      "User-centric explanations",
      "Testing assumptions",
      "System limitations"
    ]
  }
];

export default function RoadmapApp() {
  const [data, setData] = useState({});
  const [activeWeek, setActiveWeek] = useState(1);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("personal-ai-roadmap")) || {};
    setData(saved);
  }, []);

  const updateWeek = (week, field, value) => {
    const updated = { ...data, [week]: { ...data[week], [field]: value } };
    setData(updated);
    localStorage.setItem("personal-ai-roadmap", JSON.stringify(updated));
  };

  const completedCount = Object.values(data).filter(
    (w) => w?.understanding && w?.explain && w?.avoid
  ).length;

  const completion = Math.round((completedCount / roadmap.length) * 100);

  const current = roadmap.find((w) => w.week === activeWeek);

  if (!current) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* LEFT NAV */}
        <aside className="space-y-6">
          <div className="bg-gray-900/70 p-5 rounded-2xl border border-gray-800">
            <h1 className="text-xl font-semibold">AI Learning System</h1>
            <p className="text-sm text-gray-400">Personal roadmap</p>

            <div className="mt-4">
              <div className="h-2 bg-gray-700 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: `${completion}%` }} />
              </div>
              <p className="text-xs mt-2 text-gray-400">Progress: {completion}%</p>
            </div>
          </div>

          {roadmap.map((w) => (
            <button
              key={w.week}
              onClick={() => setActiveWeek(w.week)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                activeWeek === w.week
                  ? "bg-gray-800 border-green-500"
                  : "bg-gray-900 border-gray-800 hover:bg-gray-800"
              }`}
            >
              <p className="text-sm font-medium">Week {w.week}</p>
              <p className="text-xs text-gray-400">{w.title}</p>
            </button>
          ))}
        </aside>

        {/* MAIN */}
        <main className="lg:col-span-2 bg-gray-900/70 p-8 rounded-3xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-1">Week {current.week}</h2>
          <p className="text-gray-400 mb-4">{current.title} — {current.project}</p>

          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">Subtopics</p>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              {current.subtopics.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <textarea
              placeholder="What confused you?"
              className="w-full p-3 bg-gray-950 rounded-xl border border-gray-800"
              value={data[activeWeek]?.understanding || ""}
              onChange={(e) => updateWeek(activeWeek, "understanding", e.target.value)}
            />

            <textarea
              placeholder="Explain it simply"
              className="w-full p-3 bg-gray-950 rounded-xl border border-gray-800"
              value={data[activeWeek]?.explain || ""}
              onChange={(e) => updateWeek(activeWeek, "explain", e.target.value)}
            />

            <input
              placeholder="What did you avoid?"
              className="w-full p-3 bg-gray-950 rounded-xl border border-gray-800"
              value={data[activeWeek]?.avoid || ""}
              onChange={(e) => updateWeek(activeWeek, "avoid", e.target.value)}
            />
          </div>
        </main>

        {/* ROADMAP */}
        <aside className="bg-gray-900/70 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Roadmap</h3>
          <p className="text-sm text-gray-300 whitespace-pre-line">{roadmapText}</p>
        </aside>
      </div>
    </div>
  );
}
