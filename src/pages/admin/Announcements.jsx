/* src/pages/admin/Announcements.jsx */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { Megaphone, Plus, Calendar, User, Trash2, X } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { mockAnnouncements } from '../../data/mockData';
import '../../styles/pages.css';

const Announcements = () => {
  const { success, warning } = useNotifications();
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [filterPriority, setFilterPriority] = useState('all');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('2026-06-21');

  // Read role to enforce read-only modes
  const activeRole = localStorage.getItem('activeRole') || 'parent';
  const isAdmin = activeRole === 'admin';

  const handleCreateNotice = (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    if (!title || !content) {
      warning('Validation Error', 'Title and description cannot be empty.');
      return;
    }

    const newNotice = {
      id: `ann-${Date.now()}`,
      title: title,
      content: content,
      priority: priority,
      createdByName: 'Admin Coordinator Sunil Ray',
      date: new Date().toISOString().split('T')[0],
      scheduledTime: isScheduled ? `Scheduled for ${scheduledDate}` : 'Immediate'
    };

    setAnnouncements(prev => [newNotice, ...prev]);
    setIsModalOpen(false);
    success('Notice Published', `Announcement "${title}" has been shared.`);

    setTitle('');
    setContent('');
    setPriority('medium');
    setIsScheduled(false);
  };

  const handleDeleteNotice = (id) => {
    if (!isAdmin) return;
    const notice = announcements.find(n => n.id === id);
    setAnnouncements(prev => prev.filter(n => n.id !== id));
    warning('Notice Deleted', `Removed announcement "${notice.title}".`);
  };

  const filteredNotices = announcements.filter((notice) => {
    if (filterPriority === 'all') return true;
    return notice.priority === filterPriority;
  });

  return (
    <div className="page-container">
      {/* Filters & Actions */}
      <div className="roster-header-bar">
        <div className="login-tabs" style={{ marginBottom: 0 }}>
          {['all', 'high', 'medium'].map((prio) => (
            <button
              key={prio}
              className={`login-tab-btn ${filterPriority === prio ? 'active' : ''}`}
              onClick={() => setFilterPriority(prio)}
              style={{ minWidth: '100px' }}
            >
              {prio.toUpperCase()}
            </button>
          ))}
        </div>

        {isAdmin && (
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="btn-premium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Plus size={16} /> Create Notice
          </motion.button>
        )}
      </div>

      {/* Announcements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <AnimatePresence mode="popLayout">
          {filteredNotices.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              layout
            >
              <GlassCard className="roster-card" hoverEffect={false}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Megaphone size={18} style={{ color: item.priority === 'high' ? 'var(--danger)' : 'var(--primary)' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={`priority-tag ${item.priority}`}>{item.priority}</span>
                    {isAdmin && (
                      <button 
                        onClick={() => handleDeleteNotice(item.id)}
                        style={{ color: 'var(--text-tertiary)', padding: '2px' }}
                        title="Delete Notice"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '12px 0', lineHeight: 1.6 }}>
                  {item.content}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--divider)', paddingTop: '10px', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={12} /> {item.createdByName}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} /> {item.date} • {item.scheduledTime}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredNotices.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.9rem', padding: '40px' }}>
            No announcements found matching filter
          </div>
        )}
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {isModalOpen && isAdmin && (
          <div className="modal-overlay">
            <motion.div
              className="modal-content glass-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '10px' }}>
                <span>Create School Notice</span>
                <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-tertiary)' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateNotice} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                <div className="login-form-group">
                  <label>Notice Title</label>
                  <input
                    type="text"
                    className="input-glass"
                    placeholder="E.g. Parent teacher sync meet"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="login-form-group">
                  <label>Message Content</label>
                  <textarea
                    className="input-glass"
                    rows={4}
                    placeholder="Enter details here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ resize: 'none' }}
                  />
                </div>

                <div className="routine-input-row">
                  <div className="login-form-group">
                    <label>Priority Tag</label>
                    <select
                      className="input-glass"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>

                  <div className="login-form-group" style={{ display: 'flex', flexDirection: 'column', justifycontent: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      Schedule Notice
                    </span>
                    <div className="routine-toggle-group">
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                        {isScheduled ? 'Scheduled Date' : 'Publish Immediately'}
                      </span>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={isScheduled}
                          onChange={() => setIsScheduled(!isScheduled)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                {isScheduled && (
                  <motion.div
                    className="login-form-group"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label>Release Date</label>
                    <input
                      type="date"
                      className="input-glass"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                    />
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  className="btn-premium"
                  style={{ width: 'fit-content', alignSelf: 'flex-end', marginTop: '10px' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Publish Notice
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Announcements;
