/* src/pages/admin/Teachers.jsx */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { Users, Award, ShieldAlert, Edit2, Phone, Mail, X, Check } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { mockTeachers } from '../../data/mockData';
import '../../styles/pages.css';

const Teachers = () => {
  const { success } = useNotifications();
  const [teachers, setTeachers] = useState(mockTeachers);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editClass, setEditClass] = useState('');
  const [editShift, setEditShift] = useState('');

  const handleEditClick = (teacher) => {
    setEditingTeacher(teacher);
    setEditClass(teacher.assignedClass);
    setEditShift(teacher.shiftTime);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setTeachers(prev => prev.map(t => {
      if (t.id === editingTeacher.id) {
        return {
          ...t,
          assignedClass: editClass,
          shiftTime: editShift
        };
      }
      return t;
    }));
    success('Teacher Reassigned', `Updated details for ${editingTeacher.name}.`);
    setEditingTeacher(null);
  };

  return (
    <div className="page-container">
      <div className="roster-header-bar">
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Review staff attendance indices, reassign classes, and modify schedules
        </h2>
      </div>

      <div className="roster-grid">
        {teachers.map((teacher, index) => (
          <GlassCard key={teacher.id} delay={index * 0.05} className="roster-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="badge success">Active</span>
              <button 
                onClick={() => handleEditClick(teacher)}
                style={{ color: 'var(--primary)', padding: '4px' }}
                title="Edit Details"
              >
                <Edit2 size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '15px 0 10px 0' }}>
              <div className="profile-avatar" style={{ width: '45px', height: '45px', fontSize: '1.15rem' }}>
                {teacher.avatar}
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{teacher.name}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{teacher.email}</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--divider)', borderBottom: '1px solid var(--divider)', padding: '10px 0', margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="roster-card-row">
                <span>Class Allocation</span>
                <strong style={{ color: 'var(--text-primary)' }}>{teacher.assignedClass}</strong>
              </div>
              <div className="roster-card-row">
                <span>Working Shift</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{teacher.shiftTime}</span>
              </div>
              <div className="roster-card-row">
                <span>Room Number</span>
                <span>{teacher.roomNumber}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                <Award size={14} style={{ color: 'var(--warning)' }} /> Score: <strong>{teacher.performance}%</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                <ShieldAlert size={14} style={{ color: 'var(--primary)' }} /> Audit: <strong>{teacher.complianceScore}%</strong>
              </span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Edit Teacher Modal */}
      <AnimatePresence>
        {editingTeacher && (
          <div className="modal-overlay">
            <motion.div 
              className="modal-content glass-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '10px' }}>
                <span>Modify Details: <strong>{editingTeacher.name}</strong></span>
                <button onClick={() => setEditingTeacher(null)} style={{ color: 'var(--text-tertiary)' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                <div className="login-form-group">
                  <label>Assigned Class</label>
                  <input
                    type="text"
                    className="input-glass"
                    value={editClass}
                    onChange={(e) => setEditClass(e.target.value)}
                  />
                </div>

                <div className="login-form-group">
                  <label>Shift Timing</label>
                  <input
                    type="text"
                    className="input-glass"
                    value={editShift}
                    onChange={(e) => setEditShift(e.target.value)}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-premium"
                  style={{ width: 'fit-content', alignSelf: 'flex-end', marginTop: '10px' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Check size={16} /> Save Changes
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Teachers;
