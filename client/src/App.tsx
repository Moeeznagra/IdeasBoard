const sampleIdeas = [
  { id: 1, text: "Add dark mode", author: "Moeez"},
  { id: 2, text: "Add tags", author: "Sam"}
]

function App() {

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900">Ideas Board</h1>
        <p className="mt-2 text-slate-600">
          A beginner full-stack app with React, Express, PostgreSQL, WebSockets, and .NET.
        </p>

        <div className="mt-8 rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">New Idea</h2>

          <div className="mt-4 grid gap-4">
            <input
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Your name"
            />
            <textarea
              className="min-h-28 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Your idea"
            />
            <button className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700">
              Submit Idea
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">Ideas</h2>

          <div className="mt-4 space-y-4">
            {sampleIdeas.map((idea) => (
              <div key={idea.id} className="rounded-lg border border-slate-200 p-4">
                <p className="text-lg text-slate-900">{idea.text}</p>
                <p className="mt-2 text-sm text-slate-500">By {idea.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
