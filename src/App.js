import { useState } from "react";

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");

  function addNotes() {
    if (!text.trim()) return;

    const newNote = {
      id: Date.now(),
      text,
      createdAt: new Date().toLocaleString(),
    };

    const update = [...notes, newNote];
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
    setText("");
  }

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "30px",
      }}
    >
      <h1>Notes App Pro ver </h1>

      <textarea
        rows="4"
        cols="40"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write Something..."
      ></textarea>
      <br />
      <button onClick={addNotes}>Add Notes</button>

      <ul style={{ listStyle: "none", padding: "0", marginTop: "20px" }}>
        {notes.map((n) => (
          <li
            key={n.id}
            style={{ border: "1px solid #ccc", margin: "5px", padding: "10px" }}
          >
            <p>{n.text}</p>
            <small>{n.createdAt}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// end code
