import React from 'react';

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  const confirmDelete = (task) => {
    if (window.confirm('Delete this task?')) {
      onDelete(task._id);
    }
  };

  return (
    <div>
      {tasks.length === 0 && <div className="alert alert-info">No tasks found</div>}
      <div className="list-group">
        {tasks.map(task => (
          <div key={task._id} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <div className="d-flex align-items-center">
                <input className="form-check-input me-2" type="checkbox" checked={task.status==='Completed'} onChange={() => onToggle(task)} />
                <div>
                  <div style={{ textDecoration: task.status==='Completed' ? 'line-through' : 'none' }}><strong>{task.title}</strong></div>
                  {task.description && <small className="text-muted">{task.description}</small>}
                </div>
              </div>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => onEdit(task)}>Edit</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => confirmDelete(task)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
