/* src/pages/admin/DutyRoster.jsx */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { Calendar, Clock, MapPin, User, ChevronRight, Edit3, X } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { mockTeachers } from '../../data/mockData';
import '../../styles/pages.css';

const DutyRoster = () => {
  const { success } = useNotifications();
  const [viewMode, setViewMode] = useState('daily');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRosterIndex, setSelectedRosterIndex] = useState(null);

  const [roster, setRoster] = useState([
    { teacherId: 't1', room: 'Room 101', shift: '08:00 AM - 02:00 PM', class: 'Playgroup A' },
    { teacherId: 't2', room: 'Room 102', shift: '09:00 AM - 03:00 PM', class: 'Nursery B' },
    { teacherId: 't3', room: 'Room 105', shift: '08:30 AM - 02:30 PM', class: 'Kindergarten 1' },
    { teacherId: 't4', room: 'Room 201', shift: '09:30 AM - 03:30 PM', class: 'Kindergarten 2' },
    { teacherId: 't5', room: 'Room 204', shift: '08:00 AM - 02:00 PM', class: 'Toddlers C' }
  ]);

  const openReassignModal = (index) => {
    setSelectedRosterIndex(index);
    setIsModalOpen(true);
  };

  const handleReassign = (teacherId) => {
    const updatedRoster = [...roster];
    updatedRoster[selectedRosterIndex].teacherId = teacherId;
    setRoster(updatedRoster);
    setIsModalOpen(false);

    const teacher = mockTeachers.find(t => t.id === teacherId);
    success('Roster Updated', `Assigned ${teacher.name} to ${updatedRoster[selectedRosterIndex].room}.`);
  };

  return (
    <div className="page-container">
      <div className="roster-header-bar">
        <div className="login-tabs" style={{ marginBottom: 0 }}>
          {['daily', 'weekly', 'monthly'].map((mode) => (
            <button
              key={mode}
              className={`login-tab-btn ${viewMode === mode ? 'active' : ''}`}
              onClick={() => setViewMode(mode)}
              style={{ minWidth: '100px' }}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Total Active Shifts: <strong>{roster.length} Today</strong>
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'daily' && (
            <div className="roster-grid">
              {roster.map((item, index) => {
                const teacher = mockTeachers.find(t => t.id === item.teacherId) || mockTeachers[0];
                return (
                  <GlassCard key={index} delay={index * 0.05} className="roster-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span className="badge info">{item.class}</span>
                      <button 
                        onClick={() => openReassignModal(index)}
                        style={{ color: 'var(--primary)', padding: '4px', borderRadius: '4px' }}
                        title="Reassign Teacher"
                      >
                        <Edit3 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                      <div className="profile-avatar" style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', color: 'white', fontSize: '1rem' }}>
                        {teacher.avatar}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{teacher.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{teacher.email}</span>
                      </div>
                    </div>

                    <div className="roster-card-row">
                      <span><Clock size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Shift Time</span>
                      <span>{item.shift}</span>
                    </div>

                    <div className="roster-card-row">
                      <span><MapPin size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Room Number</span>
                      <span>{item.room}</span>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          )}

          {viewMode === 'weekly' && (
            <GlassCard>
              <div className="table-wrapper">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Shift/Hours</th>
                      <th>Monday</th>
                      <th>Tuesday</th>
                      <th>Wednesday</th>
                      <th>Thursday</th>
                      <th>Friday</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Morning Shift<br/><small>08:00 AM - 12:00 PM</small></strong></td>
                      <td><div style={{ padding: '8px', background: 'rgba(139,92,246,0.1)', borderRadius: '8px' }}>Aanya Sharma<br/><small>Room 101</small></div></td>
                      <td><div style={{ padding: '8px', background: 'rgba(236,72,153,0.1)', borderRadius: '8px' }}>Riya Sen<br/><small>Room 201</small></div></td>
                      <td><div style={{ padding: '8px', background: 'rgba(139,92,246,0.1)', borderRadius: '8px' }}>Aanya Sharma<br/><small>Room 101</small></div></td>
                      <td><div style={{ padding: '8px', background: 'rgba(236,72,153,0.1)', borderRadius: '8px' }}>Riya Sen<br/><small>Room 201</small></div></td>
                      <td><div style={{ padding: '8px', background: 'rgba(59,130,246,0.1)', borderRadius: '8px' }}>Vikram Malhotra<br/><small>Room 105</small></div></td>
                    </tr>
                    <tr>
                      <td><strong>Noon Shift<br/><small>12:00 PM - 04:00 PM</small></strong></td>
                      <td><div style={{ padding: '8px', background: 'rgba(245,158,11,0.1)', borderRadius: '8px' }}>Kabir Mehta<br/><small>Room 102</small></div></td>
                      <td><div style={{ padding: '8px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px' }}>Neha Gupta<br/><small>Room 204</small></div></td>
                      <td><div style={{ padding: '8px', background: 'rgba(245,158,11,0.1)', borderRadius: '8px' }}>Kabir Mehta<br/><small>Room 102</small></div></td>
                      <td><div style={{ padding: '8px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px' }}>Neha Gupta<br/><small>Room 204</small></div></td>
                      <td><div style={{ padding: '8px', background: 'rgba(139,92,246,0.1)', borderRadius: '8px' }}>Aanya Sharma<br/><small>Room 101</small></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </GlassCard>
          )}

          {viewMode === 'monthly' && (
            <GlassCard>
              <div className="chart-card-title" style={{ marginBottom: '15px' }}>
                <span>June 2026 Shift Planner Calendar</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center' }}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} style={{ fontWeight: 600, color: 'var(--text-tertiary)', fontSize: '0.8rem', padding: '6px' }}>{day}</div>
                ))}
                {Array.from({ length: 30 }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const isWeekend = dayNum % 7 === 6 || dayNum % 7 === 0;
                  const dutyTeacher = mockTeachers[dayNum % mockTeachers.length];
                  return (
                    <div 
                      key={dayNum} 
                      style={{ 
                        aspectRatio: '1', 
                        padding: '6px', 
                        borderRadius: '8px', 
                        background: isWeekend ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.08)',
                        border: '1px solid var(--card-border)',
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        minHeight: '65px'
                      }}
                    >
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-tertiary)' }}>{dayNum}</span>
                      {!isWeekend && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600, textAlign: 'left' }}>
                          {dutyTeacher.name.split(' ')[0]}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          )}
        </motion.div>
      </AnimatePresence>

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
                <span>Assign Teacher to <strong>{roster[selectedRosterIndex]?.room}</strong></span>
                <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-tertiary)' }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                {mockTeachers.map((teacher) => (
                  <div 
                    key={teacher.id}
                    onClick={() => handleReassign(teacher.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid var(--card-border)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                    whileHover={{ scale: 1.02, background: 'rgba(255, 255, 255, 0.15)' }}
                  >
                    <div className="profile-avatar" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
                      {teacher.avatar}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{teacher.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Class: {teacher.assignedClass}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DutyRoster;
