import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  // (Added Dark Mode Feature)
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Dark Mode - useEffect for theme switch

  useEffect(() => {
    document.body.style.background = darkMode ? "#111" : "#f9f9f9";
    document.body.style.color = darkMode ? "White" : "black";
  }, [darkMode]);

  // Add Notes
  function addNotes() {
    if (!text.trim()) return;

    const newNote = {
      id: Date.now(),
      text,
      createdAt: new Date().toLocaleString(),
    };

    const updated = [...notes, newNote];
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
    setText("");
  }

  // Delete Notes
  function deleteNote(id) {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
  }

  // Modify Notes
  function editNote(id, newText) {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, text: newText } : n
    );
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
  }

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "30px",
      }}
    >
      <h1>Notes App Pro ver </h1>

      {/* Dark/Liight mode toggle button*/}
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🟡 Light Mode" : "⚫ Dark Mode"}
      </button>
      <textarea
        rows="4"
        cols="40"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write Something..."
      ></textarea>
      <br />
      <button onClick={addNotes}>Add Notes</button>
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search Notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <ul style={{ listStyle: "none", padding: "0", marginTop: "20px" }}>
        {notes
          .filter(
            (n) => n.text && n.text.toLowerCase().includes(query.toLowerCase())
          )
          .map((n) => (
            <li
              key={n.id}
              style={{
                border: "1px solid #ccc",
                margin: "5px",
                padding: "10px",
              }}
            >
              <textarea
                rows="3"
                cols="40"
                value={n.text}
                onChange={(e) => editNote(n.id, e.target.value)}
              ></textarea>
              <br />
              <small>{n.createdAt}</small>
              <br />
              <button onClick={() => deleteNote(n.id)}>❌ Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;

// end code
// Work on Ui