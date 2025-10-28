import React, { useEffect, useState } from 'react';
import api from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('All');

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const res = await api.post('/tasks', task);
      setTasks(prev => [res.data, ...prev]);
    } catch (err) {
      console.error('Add failed', err);
      throw err;
    }
  };

  const updateTask = async (id, patch) => {
    try {
      const res = await api.put(`/tasks/${id}`, patch);
      setTasks(prev => prev.map(t => t._id === id ? res.data : t));
      setEditing(null);
    } catch (err) {
      console.error('Update failed', err);
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
      throw err;
    }
  };

  const toggleStatus = async (task) => {
    await updateTask(task._id, { status: task.status === 'Pending' ? 'Completed' : 'Pending' });
  };

  const filtered = tasks.filter(t => filter === 'All' ? true : t.status === filter);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Task Manager</h1>

      <div className="row">
        <div className="col-md-5">
          <TaskForm
            onAdd={addTask}
            onUpdate={updateTask}
            editing={editing}
            onCancel={() => setEditing(null)}
          />
        </div>
        <div className="col-md-7">
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div>
              <button className={`btn btn-sm me-2 ${filter==='All'?'btn-primary':'btn-outline-primary'}`} onClick={() => setFilter('All')}>All</button>
              <button className={`btn btn-sm me-2 ${filter==='Pending'?'btn-primary':'btn-outline-primary'}`} onClick={() => setFilter('Pending')}>Pending</button>
              <button className={`btn btn-sm ${filter==='Completed'?'btn-primary':'btn-outline-primary'}`} onClick={() => setFilter('Completed')}>Completed</button>
            </div>
            <div>
              <strong>Pending:</strong> {tasks.filter(t => t.status==='Pending').length}
              <span className="mx-2" />
              <strong>Completed:</strong> {tasks.filter(t => t.status==='Completed').length}
            </div>
          </div>

          <TaskList
            tasks={filtered}
            onEdit={(t) => setEditing(t)}
            onDelete={deleteTask}
            onToggle={toggleStatus}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
