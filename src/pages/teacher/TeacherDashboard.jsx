/* src/pages/teacher/TeacherDashboard.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { Users, CheckCircle2, Clock, FileText, ArrowRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import CountUp from '../../components/CountUp';
import { mockChildren } from '../../data/mockData';
import '../../styles/pages.css';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { success } = useNotifications();
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Perform morning safety check', done: true },
    { id: 2, text: 'Sanitize class tables and toys', done: true },
    { id: 3, text: 'Submit Breakfast logs for all kids', done: false },
    { id: 4, text: 'Plan afternoon outdoor block game', done: false },
    { id: 5, text: 'Conduct sensory storytime session', done: false }
  ]);

  const [studentAttendance, setStudentAttendance] = useState(
    mockChildren.reduce((acc, c) => {
      acc[c.id] = 'present';
      return acc;
    }, {})
  );

  const handleChecklistToggle = (id) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.done;
        if (nextState) success('Task Completed', item.text);
        return { ...item, done: nextState };
      }
      return item;
    }));
  };

  const handleStudentAttendance = (kidId, status) => {
    setStudentAttendance(prev => ({ ...prev, [kidId]: status }));
    const kid = mockChildren.find(c => c.id === kidId);
    success('Attendance Updated', `${kid.name} marked as ${status.toUpperCase()} today.`);
  };

  const widgets = [
    { title: 'Class Size', value: 12, label: 'Playgroup A', icon: Users, color: 'var(--primary)' },
    { title: 'Attendance Rate', value: 92, label: '11 Present / 1 Absent', icon: CheckCircle2, color: 'var(--success)' },
    { title: 'Active Tasks', value: 3, label: '2 Completed today', icon: Clock, color: 'var(--warning)' },
    { title: 'Pending Logs', value: 2, label: 'Logs due by 4 PM', icon: FileText, color: 'var(--accent)' }
  ];

  return (
    <div className="page-container">
      {/* Metric Cards */}
      <div className="kpi-grid">
        {widgets.map((wd, index) => {
          const Icon = wd.icon;
          return (
            <GlassCard key={index} delay={index * 0.1} className="kpi-card">
              <div className="kpi-details">
                <h3>{wd.title}</h3>
                <div className="kpi-value">
                  <CountUp value={wd.value} />
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                  {wd.label}
                </span>
              </div>
              <div className="kpi-icon-wrapper" style={{ color: wd.color, background: `${wd.color}15` }}>
                <Icon size={24} />
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="routine-grid">
        {/* Left Side: Class Roster list */}
        <GlassCard delay={0.2}>
          <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '10px', marginBottom: '15px' }}>
            <span>My Class Roster (Playgroup A)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {mockChildren.map((kid) => (
              <div 
                key={kid.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(255,255,255,0.06)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="profile-avatar" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}>
                    {kid.avatar}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{kid.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{kid.age}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => handleStudentAttendance(kid.id, 'present')}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: studentAttendance[kid.id] === 'present' ? 'var(--success)' : 'rgba(0,0,0,0.05)',
                      color: studentAttendance[kid.id] === 'present' ? 'white' : 'var(--text-secondary)'
                    }}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => handleStudentAttendance(kid.id, 'absent')}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: studentAttendance[kid.id] === 'absent' ? 'var(--danger)' : 'rgba(0,0,0,0.05)',
                      color: studentAttendance[kid.id] === 'absent' ? 'white' : 'var(--text-secondary)'
                    }}
                  >
                    Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Right Side: Checklist & quick link */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <GlassCard delay={0.3}>
            <div className="chart-card-title">
              <span>Morning Checklists</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
              {checklist.map((item) => (
                <label 
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.85rem',
                    color: item.done ? 'var(--text-tertiary)' : 'var(--text-secondary)',
                    textDecoration: item.done ? 'line-through' : 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '8px',
                    background: item.done ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.08)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleChecklistToggle(item.id)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                  />
                  <span>{item.text}</span>
                </label>
              ))}
            </div>
          </GlassCard>

          <GlassCard delay={0.4}>
            <div className="chart-card-title">
              <span>Quick Tasks & logs</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={() => navigate('/teacher/routinelog')}
                className="btn-premium"
                style={{ width: '100%', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', gap: '6px' }}
              >
                Enter Daily Routine logs <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => navigate('/teacher/tasks')}
                className="btn-glass"
                style={{ width: '100%', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', gap: '6px' }}
              >
                View My Assigned Tasks <ArrowRight size={16} />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
