import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
    { id: 3, text: 'Task 3' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newTaskText, setNewTaskText] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  useEffect(() => {
    const filtered = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [tasks, searchTerm]);

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask = { id: Date.now(), text: newTaskText };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  return (
      <div>
        <input
            style={{width: '240px', marginBottom: '10px', marginTop: '10px'}}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
        />
        <div>
          <input
              type="text"
              placeholder="Add new task..."
              value={newTaskText}
              onChange={(event) => setNewTaskText(event.target.value)}
          />
          <button onClick={handleAddTask}>Добавить</button>
        </div>
        <ul>
          {filteredTasks.map(task => (
              <li key={task.id}>
                {task.text}
                <button onClick={() => handleDelete(task.id)}>Удалить</button>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default TodoApp;