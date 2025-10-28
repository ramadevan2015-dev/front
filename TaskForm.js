import React, { useEffect, useState } from 'react';

function TaskForm({ onAdd, editing, onUpdate, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || '');
      setDescription(editing.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editing]);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title is required');
    setLoading(true);
    try {
      if (editing) {
        await onUpdate(editing._id, { title: title.trim(), description });
      } else {
        await onAdd({ title: title.trim(), description });
        setTitle('');
        setDescription('');
      }
    } catch (err) {
      // errors are logged by caller
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{editing ? 'Edit Task' : 'Add Task'}</h5>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" disabled={loading}>{editing ? 'Save' : 'Add'}</button>
            {editing && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
