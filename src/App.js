import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem('taskList');
    return savedTasks ? JSON.parse(savedTasks) : ['Buy groceries', 'Walk the dog', 'Water the plants'];
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    // Update the background color based on dark mode setting
    document.body.style.backgroundColor = isDarkMode ? '#333333' : '#FFFFFF';
  }, [taskList, isDarkMode]);

  const addTask = () => {
    if (task) {
      setTaskList([...taskList, task]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    const newTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(newTaskList);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1>My To-Do List</h1>
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        onKeyDown={handleKeyDown}
        placeholder="New task" 
      />
      <button onClick={addTask}>Add Task</button>
      <button onClick={toggleTheme}>Toggle Dark Mode</button>
      <div>
        {taskList.map((t, index) => (
          <p key={index} onClick={() => deleteTask(index)}>{t}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
