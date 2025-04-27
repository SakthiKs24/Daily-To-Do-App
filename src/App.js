import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Daily To - Do App</h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/tasks" className="nav-link">Task List</Link>
      </div>
    </nav>
  );
}

function AddTask({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const navigate = useNavigate();

  const handleAddTask = () => {
    if (title.trim() !== "") {
      const newTask = {
        title,
        description,
        dueDate,
        priority,
      };
      setTasks([...tasks, newTask]);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
      navigate("/tasks"); // redirect after adding
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add New Task</h2>
      <div className="input-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="input"
          rows="3"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="input"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button onClick={handleAddTask} className="add-button">
          Add Task
        </button>
      </div>
    </div>
  );
}

function TaskList({ tasks, setTasks }) {
  const navigate = useNavigate();

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h2 className="title">Task List</h2>

      <button onClick={() => navigate("/")} className="add-button" style={{ marginBottom: "20px" }}>
        ➕ Add New Task
      </button>

      <ul className="task-list">
        {tasks.map((item, index) => (
          <li key={index} className="task-item">
            <div>
              <h3><strong>Title:</strong>{item.title}</h3>
              <p><strong>Description:</strong>{item.description}</p>
              <p><strong>Due:</strong> {item.dueDate || "No date"}</p>
              <p><strong>Priority:</strong> {item.priority}</p>
            </div>
            <button
              onClick={() => handleDeleteTask(index)}
              className="delete-button"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddTask tasks={tasks} setTasks={setTasks} />} />
        <Route path="/tasks" element={<TaskList tasks={tasks} setTasks={setTasks} />} />
      </Routes>
    </Router>
  );
}

export default App;
