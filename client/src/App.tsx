import { FormEvent, useEffect, useState } from "react";

type Idea = {
  id: number;
  text: string;
  author: string;
};

const API_URL = "http://localhost:3001";

function App() {
  const [name, setName] = useState(localStorage.getItem("idea-author") ?? "");
  const [ideaText, setIdeaText] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("idea-author", name);
  }, [name]);

  useEffect(() => {
    async function loadIdeas() {
      const response = await fetch(`${API_URL}/ideas`);
      const data = await response.json();
      setIdeas(data);
      setLoading(false);
    }

    loadIdeas();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name.trim() || !ideaText.trim()) {
      alert("Please enter your name and idea.");
      return;
    }

    const response = await fetch(`${API_URL}/ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: ideaText,
        author: name
      })
    });

    const newIdea = await response.json();
    setIdeas((current) => [newIdea, ...current]);
    setIdeaText("");
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900">Ideas Board</h1>
        <p className="mt-2 text-slate-600">React + Express version</p>

        <form onSubmit={handleSubmit} className="mt-8 rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">New Idea</h2>

          <div className="mt-4 grid gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Your name"
            />
            <textarea
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              className="min-h-28 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Your idea"
            />
            <button className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700">
              Submit Idea
            </button>
          </div>
        </form>

        <div className="mt-8 rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">Ideas</h2>

          {loading ? (
            <p className="mt-4 text-slate-500">Loading...</p>
          ) : (
            <div className="mt-4 space-y-4">
              {ideas.map((idea) => (
                <div key={idea.id} className="rounded-lg border border-slate-200 p-4">
                  <p className="text-lg text-slate-900">{idea.text}</p>
                  <p className="mt-2 text-sm text-slate-500">By {idea.author}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;