/* src/pages/teacher/DailyRoutineLog.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { Coffee, Droplet, Smile, Moon, Send, ChevronLeft } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { mockChildren } from '../../data/mockData';
import '../../styles/pages.css';

const DailyRoutineLog = () => {
  const navigate = useNavigate();
  const { success, info } = useNotifications();
  const [selectedKidId, setSelectedKidId] = useState('c1');

  // Logs Form State
  const [breakfast, setBreakfast] = useState('full');
  const [lunch, setLunch] = useState('full');
  const [snacks, setSnacks] = useState('full');
  const [waterCups, setWaterCups] = useState(4);
  const [napTime, setNapTime] = useState('1.5 Hours');
  const [pottyCheck, setPottyCheck] = useState(true);
  const [activityNotes, setActivityNotes] = useState('');

  const activeKid = mockChildren.find(k => k.id === selectedKidId) || mockChildren[0];

  const handleLogSubmit = (e) => {
    e.preventDefault();
    success('Routine Log Saved', `Successfully updated daily logs for ${activeKid.name}.`);
    info('Parent Notification Sent', `Daily report summary has been pushed to ${activeKid.parentName}'s mobile app.`);
    setActivityNotes('');
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/teacher/dashboard')} 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}
        >
          <ChevronLeft size={16} /> Back to Teacher Dashboard
        </button>
      </div>

      <div className="routine-grid">
        {/* Child Selector */}
        <GlassCard>
          <div className="chart-card-title">
            <span>Select Active Student</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {mockChildren.map((kid) => (
              <div 
                key={kid.id}
                onClick={() => setSelectedKidId(kid.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: selectedKidId === kid.id ? 'var(--primary)' : 'var(--card-border)',
                  background: selectedKidId === kid.id ? 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(236,72,153,0.02) 100%)' : 'rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div className="profile-avatar" style={{ width: '30px', height: '30px' }}>
                  {kid.avatar}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{kid.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{kid.age}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Entry Form */}
        <GlassCard>
          <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '12px', marginBottom: '15px' }}>
            <span>Daily Routine Log for <strong>{activeKid.name}</strong></span>
          </div>

          <form onSubmit={handleLogSubmit} className="routine-form">
            <div className="routine-input-row">
              <div className="login-form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Coffee size={14} style={{ color: 'var(--primary)' }} /> Breakfast intake
                </label>
                <select 
                  className="input-glass" 
                  value={breakfast}
                  onChange={(e) => setBreakfast(e.target.value)}
                >
                  <option value="full">Full Eaten</option>
                  <option value="partial">Half Eaten</option>
                  <option value="none">Did Not Eat</option>
                </select>
              </div>
              <div className="login-form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Coffee size={14} style={{ color: 'var(--secondary)' }} /> Lunch intake
                </label>
                <select 
                  className="input-glass"
                  value={lunch}
                  onChange={(e) => setLunch(e.target.value)}
                >
                  <option value="full">Full Eaten</option>
                  <option value="partial">Half Eaten</option>
                  <option value="none">Did Not Eat</option>
                </select>
              </div>
            </div>

            <div className="routine-input-row">
              <div className="login-form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Coffee size={14} style={{ color: 'var(--accent)' }} /> Afternoon Snacks
                </label>
                <select 
                  className="input-glass"
                  value={snacks}
                  onChange={(e) => setSnacks(e.target.value)}
                >
                  <option value="full">Full Eaten</option>
                  <option value="partial">Half Eaten</option>
                  <option value="none">Did Not Eat</option>
                </select>
              </div>
              <div className="login-form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Droplet size={14} style={{ color: 'var(--accent)' }} /> Water Intake
                </label>
                <select 
                  className="input-glass"
                  value={waterCups}
                  onChange={(e) => setWaterCups(Number(e.target.value))}
                >
                  <option value="2">2 Cups (500ml)</option>
                  <option value="4">4 Cups (1 Litre)</option>
                  <option value="6">6 Cups (1.5 Litres)</option>
                  <option value="8">8 Cups (2 Litres)</option>
                </select>
              </div>
            </div>

            <div className="routine-input-row">
              <div className="login-form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Moon size={14} style={{ color: 'var(--primary)' }} /> Nap Duration
                </label>
                <select 
                  className="input-glass"
                  value={napTime}
                  onChange={(e) => setNapTime(e.target.value)}
                >
                  <option value="30 Mins">30 Minutes</option>
                  <option value="1 Hour">1 Hour</option>
                  <option value="1.5 Hours">1.5 Hours</option>
                  <option value="2 Hours">2 Hours</option>
                  <option value="No Nap">Did Not Nap</option>
                </select>
              </div>

              <div className="login-form-group" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Smile size={14} style={{ color: 'var(--success)' }} /> Potty Check
                </span>
                <div className="routine-toggle-group">
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                    {pottyCheck ? 'Completed Potty Check' : 'Pending Check'}
                  </span>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={pottyCheck}
                      onChange={() => setPottyCheck(!pottyCheck)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="login-form-group">
              <label>Daily Activity & Behavior Notes</label>
              <textarea
                className="input-glass"
                rows={3}
                placeholder="Enter logs details..."
                value={activityNotes}
                onChange={(e) => setActivityNotes(e.target.value)}
                style={{ resize: 'none' }}
              />
            </div>

            <motion.button 
              type="submit"
              className="btn-premium"
              style={{ width: 'fit-content', alignSelf: 'flex-end' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={16} /> Save & Send Report
            </motion.button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default DailyRoutineLog;
