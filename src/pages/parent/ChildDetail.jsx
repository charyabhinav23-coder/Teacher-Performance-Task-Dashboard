/* src/pages/parent/ChildDetail.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { Phone, Mail, Award, Smile, Frown, Sparkles, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { mockChildren } from '../../data/mockData';
import '../../styles/pages.css';

const ChildDetail = () => {
  const navigate = useNavigate();
  const { success } = useNotifications();

  // Demo active parent child is Aarav (id: 'c1')
  const child = mockChildren[0];

  const [activeMood, setActiveMood] = useState(child.mood);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [expandedTimelineIndex, setExpandedTimelineIndex] = useState(0);
  const [teacherNotes, setTeacherNotes] = useState('Aarav has been showing excellent improvement in shape matching and cooperative play. He sharing his toys nicely with Kabir.');

  const handleNextPhoto = () => {
    setCarouselIndex(prev => (prev + 1) % child.photos.length);
  };

  const handlePrevPhoto = () => {
    setCarouselIndex(prev => (prev - 1 + child.photos.length) % child.photos.length);
  };

  const moodsList = [
    { name: 'Happy', emoji: '😊', desc: 'Active & smiling' },
    { name: 'Energetic', emoji: '⚡', desc: 'Extremely active' },
    { name: 'Curious', emoji: '🧐', desc: 'Exploring toys' },
    { name: 'Tired', emoji: '😴', desc: 'Needs quiet rest' },
    { name: 'Fussy', emoji: '🥺', desc: 'Slightly emotional' }
  ];

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

      <div className="child-profile-grid">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <GlassCard className="child-avatar-card">
            <div className="child-big-avatar">
              {child.avatar}
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{child.name}</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Age: {child.age}</p>
              <span className="badge info" style={{ marginTop: '5px' }}>{child.assignedClass}</span>
            </div>

            <div style={{ width: '100%', borderTop: '1px solid var(--divider)', paddingTop: '15px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <Phone size={16} style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>{child.parentContact} ({child.parentName})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <Mail size={16} style={{ color: 'var(--secondary)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>parent.comm@intellitots.com</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="chart-card-title">
              <span>Learning & Growth Milestones</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
              {child.milestones.map((ms, idx) => (
                <div key={idx} style={{ fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontWeight: 500 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{ms.name}</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{ms.progress}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--divider)', borderRadius: '10px', overflow: 'hidden' }}>
                    <motion.div 
                      style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${ms.progress}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="chart-card-title">
              <span>Mood Tracking</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '10px 0' }}>
              {moodsList.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    minWidth: '70px',
                    padding: '8px',
                    borderRadius: '10px',
                    border: '1px solid',
                    borderColor: activeMood === m.name ? 'var(--primary)' : 'var(--card-border)',
                    background: activeMood === m.name ? 'rgba(139,92,246,0.1)' : 'rgba(0,0,0,0.02)',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '1.5rem', display: 'block' }}>{m.emoji}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <GlassCard>
            <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '10px', marginBottom: '15px' }}>
              <span>Daily Timeline Tracker</span>
              <button 
                onClick={() => navigate('/parent/updates')}
                style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Detailed Logs <ArrowRight size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {child.timeline.map((item, index) => {
                const isExpanded = expandedTimelineIndex === index;
                return (
                  <div 
                    key={index}
                    style={{
                      border: '1px solid var(--card-border)',
                      borderRadius: '12px',
                      padding: '12px',
                      background: isExpanded ? 'rgba(139,92,246,0.05)' : 'rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                    onClick={() => setExpandedTimelineIndex(isExpanded ? null : index)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)', background: 'rgba(139,92,246,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                          {item.time}
                        </span>
                        <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.event}</strong>
                      </div>
                      <ChevronRight size={16} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', color: 'var(--text-tertiary)' }} />
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: '8px' }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: 'hidden', fontSize: '0.85rem', color: 'var(--text-secondary)' }}
                        >
                          {item.desc}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="chart-card-title">
              <span>Classroom Photos & Activities</span>
            </div>
            
            <div className="carousel-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  className="carousel-slide"
                  style={{ backgroundImage: `url(${child.photos[carouselIndex].url})` }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="carousel-caption">
                    {child.photos[carouselIndex].caption}
                  </div>
                </motion.div>
              </AnimatePresence>

              <button className="carousel-btn prev" onClick={handlePrevPhoto}>
                <ChevronLeft size={16} />
              </button>
              <button className="carousel-btn next" onClick={handleNextPhoto}>
                <ChevronRight size={16} />
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="chart-card-title">
              <span>Teacher Comments & Notes</span>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', border: '1px solid var(--card-border)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {teacherNotes}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ChildDetail;
