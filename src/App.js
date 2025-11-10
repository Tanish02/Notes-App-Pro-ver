import { useEffect, useState } from "react";
import {
  Notebook,
  Plus,
  Search,
  Trash2,
  FileText,
  SunMoon,
} from "lucide-react";

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedNote, setSelectedNote] = useState(null);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Dark Mode - useEffect for theme to switch
  useEffect(() => {
    document.body.style.background = darkMode ? "#1a1a1a" : "#f5f6fa";
    document.body.style.color = darkMode ? "#f5f5f5" : "#222";
    document.body.style.fontFamily = "Inter, Poppins, sans-serif";
    document.body.style.transition = "0.3s";
  }, [darkMode]);

  // Add Notes
  function addNotes() {
    if (!text.trim()) return;

    const newNote = {
      id: Date.now(),
      title: text.split("\n")[0] || "Untitled",
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
    if (selectedNote?.id === id) setSelectedNote(null);
  }

  // Modify Notes
  function editNote(id, newText) {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, text: newText, title: newText.split("\n")[0] } : n
    );
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
  }

  const filteredNotes = notes.filter(
    (n) => n.text && n.text.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* ==== Sidebar ==== */}
      <aside
        style={{
          width: "240px",
          background: darkMode ? "#2b2b2b" : "#ffffff",
          borderRight: darkMode ? "1px solid #333" : "1px solid #ddd",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "0.3s",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "18px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Notebook size={20} /> Notes
          </h2>

          {/* Add Notes Button */}
          <button
            onClick={addNotes}
            style={{
              width: "100%",
              padding: "10px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontWeight: "500",
            }}
          >
            <Plus size={16} /> Add New Note
          </button>

          {/* Search Notes */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "15px",
              background: darkMode ? "#3a3a3a" : "#f9f9f9",
              borderRadius: "6px",
              padding: "6px 10px",
              border: "1px solid #ccc",
            }}
          >
            <Search size={16} style={{ opacity: 0.6, marginRight: "6px" }} />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                color: darkMode ? "white" : "black",
              }}
            />
          </div>

          {/* Notes List */}
          <ul
            style={{
              listStyle: "none",
              marginTop: "20px",
              padding: 0,
              overflowY: "auto",
              maxHeight: "65vh",
            }}
          >
            {filteredNotes.map((n) => (
              <li
                key={n.id}
                onClick={() => setSelectedNote(n)}
                style={{
                  background:
                    selectedNote?.id === n.id
                      ? darkMode
                        ? "#444"
                        : "#e9f2ff"
                      : "transparent",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginBottom: "10px",
                  transition: "0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FileText size={16} />
                <div>
                  <strong>
                    {n.title.length > 25
                      ? n.title.slice(0, 25) + "..."
                      : n.title}
                  </strong>
                  <br />
                  <small style={{ opacity: 0.6 }}>{n.createdAt}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Dark / Light Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: darkMode ? "#f1c40f" : "#111",
            color: darkMode ? "#111" : "#f9f9f9",
            border: "none",
            borderRadius: "20px",
            padding: "8px",
            cursor: "pointer",
            marginTop: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "0.3s",
          }}
        >
          <SunMoon size={18} />
          {darkMode ? "Light / Dark" : "Dark / Light"}
        </button>
      </aside>

      {/* ==== Main Editor Area ==== */}
      <main
        style={{
          flex: 1,
          padding: "25px",
          background: darkMode ? "#1e1e1e" : "#f9f9f9",
          transition: "0.3s",
          overflowY: "auto",
        }}
      >
        {selectedNote ? (
          <div
            style={{
              maxWidth: "800px",
              margin: "auto",
              background: darkMode ? "#2b2b2b" : "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: darkMode
                ? "0 0 10px rgba(255,255,255,0.05)"
                : "0 0 10px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
          >
            <h2 contentEditable suppressContentEditableWarning>
              {selectedNote.title}
            </h2>

            <textarea
              rows="15"
              value={selectedNote.text}
              onChange={(e) => editNote(selectedNote.id, e.target.value)}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "15px",
                background: darkMode ? "#3a3a3a" : "#fafafa",
                color: darkMode ? "white" : "#111",
                border: "1px solid #ccc",
                outline: "none",
                resize: "vertical",
              }}
            ></textarea>

            <div style={{ textAlign: "right", marginTop: "10px" }}>
              {/* Delete Button */}
              <button
                onClick={() => deleteNote(selectedNote.id)}
                style={{
                  background: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 14px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Trash2 size={16} /> Delete Note
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "150px",
              opacity: 0.7,
            }}
          >
            <h2>Select or create a note to begin ✍️</h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

// end code
