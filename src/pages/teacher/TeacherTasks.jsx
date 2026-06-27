/* src/pages/teacher/TeacherTasks.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { Clock, CheckSquare, ChevronLeft, ArrowRight, Check } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { mockTasks } from '../../data/mockData';
import '../../styles/pages.css';

const TeacherTasks = () => {
  const navigate = useNavigate();
  const { success } = useNotifications();
  
  // Filter tasks for assignee 't1' (demo active teacher)
  const [tasks, setTasks] = useState(
    mockTasks.filter(t => t.assignee === 't1')
  );

  const handleProgress = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        let nextStatus = 'to-do';
        if (t.status === 'to-do') nextStatus = 'in-progress';
        else if (t.status === 'in-progress') nextStatus = 'review';
        else if (t.status === 'review') nextStatus = 'completed';
        else nextStatus = 'completed';

        success('Task Updated', `Task status set to ${nextStatus.toUpperCase()}`);
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'review': return 'warning';
      default: return 'danger';
    }
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/teacher/dashboard')} 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <GlassCard className="roster-card" hoverEffect={false}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className={`badge ${getStatusBadgeClass(task.status)}`} style={{ marginBottom: '6px' }}>
                      {task.status}
                    </span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{task.title}</h3>
                  </div>

                  <span className={`priority-tag ${task.priority}`}>{task.priority}</span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '10px 0' }}>
                  {task.desc}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--divider)', paddingTop: '10px', marginTop: '10px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> Due date: {task.dueDate}
                  </span>

                  {task.status !== 'completed' ? (
                    <button
                      onClick={() => handleProgress(task.id)}
                      className="btn-premium"
                      style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      Progress Task <ArrowRight size={12} />
                    </button>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600 }}>
                      <Check size={14} /> Completed
                    </span>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>

        {tasks.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '40px' }}>
            No tasks assigned currently
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherTasks;
