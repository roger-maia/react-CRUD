import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    // Simulated API call to fetch tasks (you can replace this with actual API calls)
    const mockAPIResponse = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' },
    ];
    setTasks(mockAPIResponse);
  }, []);

  const addTask = () => {
    if (newTask.trim() === '') return;

    if (editTask === null) {
      // Add a new task
      const newTaskObject = { id: Date.now(), title: newTask };
      setTasks([...tasks, newTaskObject]);
    } else {
      // Edit an existing task
      const updatedTasks = tasks.map((task) =>
        task.id === editTask ? { ...task, title: newTask } : task
      );
      setTasks(updatedTasks);
      setEditTask(null);
    }

    setNewTask('');
  };

  const deleteTask = (id) => {
    // Delete a task
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const editTaskItem = (id) => {
    // Set the task to edit
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setNewTask(taskToEdit.title);
      setEditTask(id);
    }
  };

  return (
    <div className="App">
      <h1>React CRUD App</h1>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>
          {editTask === null ? 'Add Task' : 'Update Task'}
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => editTaskItem(task.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
