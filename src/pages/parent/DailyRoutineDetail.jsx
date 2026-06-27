/* src/pages/parent/DailyRoutineDetail.jsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Coffee, Moon, Droplet, Smile, Image as ImageIcon } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import CircularProgress from '../../components/CircularProgress';
import { mockChildren } from '../../data/mockData';
import '../../styles/pages.css';

const DailyRoutineDetail = () => {
  const navigate = useNavigate();

  // Demo active parent child is Aarav (id: 'c1')
  const child = mockChildren[0];

  return (
    <div className="page-container">
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/parent/dashboard')} 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}
        >
          <ChevronLeft size={16} /> Back to Parent Dashboard
        </button>
      </div>

      {/* Progress Rings summary card */}
      <GlassCard delay={0.1} style={{ marginBottom: '20px' }}>
        <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '10px', marginBottom: '15px' }}>
          <span>Daily Completion Ring Metrics: <strong>{child.name}</strong></span>
          <span className="badge success">Today</span>
        </div>

        <div className="progress-rings-row">
          <CircularProgress percent={85} size={110} color="var(--primary)" label="Meals Eaten" />
          <CircularProgress percent={100} size={110} color="var(--secondary)" label="Nap Sleep" />
          <CircularProgress percent={75} size={110} color="var(--accent)" label="Hydration" />
          <CircularProgress percent={90} size={110} color="var(--success)" label="Activities" />
        </div>
      </GlassCard>

      {/* Grid of details */}
      <div className="routine-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <GlassCard delay={0.2}>
            <div className="chart-card-title">
              <span>Meals & Hydration Logs</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Coffee size={18} style={{ color: 'var(--primary)', marginTop: '3px' }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Breakfast intake</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Ate 1 bowl of vegetable oats. Drank warm milk. (100% Eaten)</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Coffee size={18} style={{ color: 'var(--secondary)', marginTop: '3px' }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Lunch intake</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Finished 80% of steam rice and lintel soup. Refused salad carrots.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Droplet size={18} style={{ color: 'var(--accent)', marginTop: '3px' }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Water Intake Intervals</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Log checks: 10:00 AM, 12:30 PM, 2:30 PM, 3:45 PM. (Total: 4 Cups / 1 Litre)</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={0.3}>
            <div className="chart-card-title">
              <span>Behavior & Sleep Log</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Moon size={18} style={{ color: 'var(--primary)', marginTop: '3px' }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Sleep Time and Quality</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Nap took place in Room 102. Fell asleep within 10 minutes. Slept 1.5 Hours total.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Smile size={18} style={{ color: 'var(--success)', marginTop: '3px' }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Potty & Hygiene Checks</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Checked twice at 10:30 AM and 2:15 PM. Diaper changed once. Stools normal.</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <GlassCard delay={0.4}>
            <div className="chart-card-title">
              <span>Classroom Activities Log</span>
            </div>
            
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-badge"></div>
                <div className="timeline-time">10:00 AM</div>
                <div className="timeline-title">Shape matching game</div>
                <div className="timeline-desc">Identified circle, square, and triangle. Finished puzzle board in 4 minutes.</div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge"></div>
                <div className="timeline-time">03:00 PM</div>
                <div className="timeline-title">Building Blocks game</div>
                <div className="timeline-desc">Built a tall tower cooperative building with Kiara and Kabir. No sharing disputes observed.</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={0.5}>
            <div className="chart-card-title" style={{ marginBottom: '15px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ImageIcon size={18} style={{ color: 'var(--primary)' }} />
                Day Photo Gallery
              </span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
              {child.photos.map((ph, idx) => (
                <div 
                  key={idx}
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    height: '110px',
                    position: 'relative',
                    border: '1px solid var(--card-border)'
                  }}
                >
                  <img 
                    src={ph.url} 
                    alt={ph.caption} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '4px', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.65rem', textAlign: 'center' }}>
                    {ph.caption.split(' - ')[0]}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default DailyRoutineDetail;
