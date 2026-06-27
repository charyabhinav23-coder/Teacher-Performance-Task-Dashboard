/* src/pages/admin/TaskBoard.jsx */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { Calendar, User, Plus, Trash2, X, Clock } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { mockTasks, mockTeachers } from '../../data/mockData';
import '../../styles/pages.css';

const COLUMNS = [
  { id: 'to-do', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Under Review' },
  { id: 'completed', title: 'Completed' }
];

const TaskBoard = () => {
  const { success, warning } = useNotifications();
  const [tasks, setTasks] = useState(mockTasks);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newAssignee, setNewAssignee] = useState('t1');
  const [newDate, setNewDate] = useState('2026-06-20');

  const handleDragStart = (e, id) => {
    setDraggedTaskId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    
    if (taskId) {
      setTasks(prev => prev.map(t => {
        if (t.id === taskId) {
          if (t.status !== targetColumnId) {
            success('Task Updated', `Moved task to ${targetColumnId.toUpperCase()}`);
          }
          return { ...t, status: targetColumnId };
        }
        return t;
      }));
    }
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc) {
      warning('Validation Error', 'Task title and details cannot be empty.');
      return;
    }

    const newTask = {
      id: `tsk-${Date.now()}`,
      title: newTitle,
      desc: newDesc,
      status: 'to-do',
      priority: newPriority,
      dueDate: newDate,
      assignee: newAssignee
    };

    setTasks(prev => [newTask, ...prev]);
    setIsModalOpen(false);
    success('Task Added', `Successfully created task "${newTitle}"`);

    setNewTitle('');
    setNewDesc('');
    setNewPriority('medium');
    setNewAssignee('t1');
  };

  const handleDeleteTask = (id) => {
    const deletedTask = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(t => t.id !== id));
    warning('Task Removed', `Deleted task "${deletedTask.title}"`);
  };

  return (
    <div className="page-container">
      <div className="roster-header-bar">
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Manage school duties, curriculum schedules, and parent syncs
        </h2>
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="btn-premium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <Plus size={16} /> Add Task
        </motion.button>
      </div>

      <div className="kanban-board">
        {COLUMNS.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id);
          const isOver = dragOverColumn === col.id;

          return (
            <div
              key={col.id}
              className={`kanban-column ${isOver ? 'drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              <div className="kanban-column-header">
                <span>{col.title}</span>
                <span className="column-count">{colTasks.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
                <AnimatePresence>
                  {colTasks.map((task) => {
                    const assigneeObj = mockTeachers.find(t => t.id === task.assignee) || mockTeachers[0];
                    return (
                      <motion.div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        className="kanban-card"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        layout
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span className={`priority-tag ${task.priority}`}>
                            {task.priority}
                          </span>
                          <button 
                            onClick={() => handleDeleteTask(task.id)}
                            style={{ color: 'var(--text-tertiary)', padding: '2px' }}
                            title="Delete Task"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <h4 className="kanban-card-title">{task.title}</h4>
                        <p className="kanban-card-desc">{task.desc}</p>

                        <div className="kanban-card-footer">
                          <span className="kanban-card-date">
                            <Clock size={12} />
                            {task.dueDate}
                          </span>
                          
                          <div 
                            className="profile-avatar" 
                            style={{ width: '24px', height: '24px', fontSize: '0.65rem' }}
                            title={`Assigned to ${assigneeObj.name}`}
                          >
                            {assigneeObj.avatar}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {colTasks.length === 0 && (
                  <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem', padding: '20px', border: '1px dashed var(--divider)', borderRadius: '10px', marginTop: '10px' }}>
                    Drag tasks here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              className="modal-content glass-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '10px' }}>
                <span>Create New Task</span>
                <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-tertiary)' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                <div className="login-form-group">
                  <label>Task Title</label>
                  <input
                    type="text"
                    className="input-glass"
                    placeholder="E.g. Parent Sync Sheets"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>

                <div className="login-form-group">
                  <label>Details / Scope</label>
                  <textarea
                    className="input-glass"
                    rows={3}
                    placeholder="Enter task details..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    style={{ resize: 'none' }}
                  />
                </div>

                <div className="routine-input-row">
                  <div className="login-form-group">
                    <label>Priority</label>
                    <select
                      className="input-glass"
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>

                  <div className="login-form-group">
                    <label>Assignee</label>
                    <select
                      className="input-glass"
                      value={newAssignee}
                      onChange={(e) => setNewAssignee(e.target.value)}
                    >
                      {mockTeachers.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="login-form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    className="input-glass"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-premium"
                  style={{ width: 'fit-content', alignSelf: 'flex-end', marginTop: '10px' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Task
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskBoard;
