import { useState } from "react";
import "./App.css";

export default function TodoApp() {
  const [name, setName] = useState("");
  const [work, setWork] = useState("");
  const [todos, setTodos] = useState([]);

  function handleAdd() {
    if (!name || !work) {
      alert("Name aur Work dono bharo 😄");
      return;
    }

    const today = new Date();

    const newTodo = {
      id: Date.now(),
      name: name,
      work: work,
      date: today.toLocaleDateString(),
      day: today.toLocaleDateString("en-US", { weekday: "long" }),
      completed: false, // 👈 NEW
    };

    setTodos([...todos, newTodo]);
    setWork("");
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: true }
          : todo
      )
    );
  }

  return (
    <div className="todo-container">
      <h2>📝 Todo List</h2>

      <input
        className="todo-input"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        className="todo-input"
        placeholder="Enter your work"
        value={work}
        onChange={(e) => setWork(e.target.value)}
      />

      <button className="add-btn" onClick={handleAdd}>
        Add ➕
      </button>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                opacity: todo.completed ? 0.6 : 1,
              }}
            >
              <strong>👤 {todo.name}</strong><br />
              📅 {todo.date} ({todo.day})<br />
              🧾 {todo.work}
            </div>

            <div>
              {!todo.completed && (
                <button
                  className="complete-btn"
                  onClick={() => handleComplete(todo.id)}
                >
                  ✔ Complete
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
