import React, { useState, useEffect } from 'react';
import './App.css';

// SVG Icons
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

// Initial Data
const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' }
];

const INIT_TASKS = [
  { id: '1', title: 'Design Database Schema', desc: 'Create ERD and schema definitions for user module', status: 'todo', priority: 'high' },
  { id: '2', title: 'Implement Auth API', desc: 'Setup JWT authentication and passport strategies', status: 'in_progress', priority: 'high' },
  { id: '3', title: 'Setup UI System', desc: 'Configure CSS variables and design tokens for the app', status: 'done', priority: 'medium' }
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskify-tasks');
    return saved ? JSON.parse(saved) : INIT_TASKS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // null if creation

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    status: 'todo',
    priority: 'medium'
  });

  useEffect(() => {
    localStorage.setItem('taskify-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const openModal = (task = null) => {
    if (task) {
      setFormData(task);
      setCurrentTask(task.id);
    } else {
      setFormData({ title: '', desc: '', status: 'todo', priority: 'medium' });
      setCurrentTask(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (currentTask) {
      setTasks(tasks.map(t => t.id === currentTask ? { ...formData, id: currentTask } : t));
    } else {
      setTasks([...tasks, { ...formData, id: Date.now().toString() }]);
    }
    closeModal();
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const moveTask = (id, direction) => {
    const currentTaskObj = tasks.find(t => t.id === id);
    if (!currentTaskObj) return;

    const currentIdx = COLUMNS.findIndex(col => col.id === currentTaskObj.status);
    const newIdx = currentIdx + direction;

    if (newIdx >= 0 && newIdx < COLUMNS.length) {
      const newStatus = COLUMNS[newIdx].id;
      setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="header-title">Taskify</h1>
        <button className="add-btn" onClick={() => openModal()}>
          <PlusIcon />
          <span>New Task</span>
        </button>
      </header>

      <main className="board">
        {COLUMNS.map((column, index) => {
          const colTasks = tasks.filter(t => t.status === column.id);

          return (
            <div key={column.id} className="column">
              <div className="column-header">
                <h2>{column.title}</h2>
                <span className="task-count">{colTasks.length}</span>
              </div>

              <div className="task-list">
                {colTasks.length > 0 ? colTasks.map(task => (
                  <div key={task.id} className="task-card">
                    <h3 className="task-title">{task.title}</h3>
                    {task.desc && <p className="task-desc">{task.desc}</p>}

                    <div className="task-footer">
                      <span className={`priority-badge priority-${task.priority}`}>
                        {task.priority}
                      </span>

                      <div className="task-actions">
                        <button
                          className="action-btn"
                          onClick={() => moveTask(task.id, -1)}
                          disabled={index === 0}
                          style={{ opacity: index === 0 ? 0.3 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}
                        >
                          <ArrowLeftIcon />
                        </button>
                        <button className="action-btn" onClick={() => openModal(task)}>
                          <EditIcon />
                        </button>
                        <button className="action-btn delete" onClick={() => deleteTask(task.id)}>
                          <TrashIcon />
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => moveTask(task.id, 1)}
                          disabled={index === COLUMNS.length - 1}
                          style={{ opacity: index === COLUMNS.length - 1 ? 0.3 : 1, cursor: index === COLUMNS.length - 1 ? 'not-allowed' : 'pointer' }}
                        >
                          <ArrowRightIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="empty-state">No tasks here yet.</div>
                )}
              </div>
            </div>
          );
        })}
      </main>

      {/* Task Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{currentTask ? 'Edit Task' : 'Create New Task'}</h2>
              <button className="close-btn" onClick={closeModal}><CloseIcon /></button>
            </div>

            <form onSubmit={handleSaveTask}>
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Design homepage overlay"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea
                  name="desc"
                  className="form-control"
                  value={formData.desc}
                  onChange={handleInputChange}
                  placeholder="Additional details..."
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Status</label>
                  <select name="status" className="form-control" value={formData.status} onChange={handleInputChange}>
                    {COLUMNS.map(col => <option key={col.id} value={col.id}>{col.title}</option>)}
                  </select>
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label>Priority</label>
                  <select name="priority" className="form-control" value={formData.priority} onChange={handleInputChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={!formData.title.trim()}>
                  {currentTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
