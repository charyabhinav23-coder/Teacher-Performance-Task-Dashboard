/* src/pages/parent/ParentDashboard.jsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Baby, Activity, Heart, ArrowRight, Bell, MessageSquare } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import CircularProgress from '../../components/CircularProgress';
import { mockChildren } from '../../data/mockData';
import '../../styles/pages.css';

const ParentDashboard = () => {
  const navigate = useNavigate();
  
  // Demo active parent child is Aarav (id: 'c1')
  const child = mockChildren[0];

  return (
    <div className="page-container">
      {/* Welcome banner */}
      <GlassCard delay={0.1} style={{ marginBottom: '20px', background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(236,72,153,0.05) 100%)' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Welcome back, {child.parentName}!
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
          Here is a summary of <strong>{child.name}'s</strong> daycare activities at FC Intellitots today.
        </p>
      </GlassCard>

      {/* Child Metrics Quick Ring */}
      <div className="routine-grid">
        {/* Left: Quick indicators rings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <GlassCard delay={0.2}>
            <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '10px', marginBottom: '15px' }}>
              <span>Today's Log Completion</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '15px' }}>
              <CircularProgress percent={85} size={90} color="var(--primary)" label="Meals" />
              <CircularProgress percent={100} size={90} color="var(--secondary)" label="Nap Sleep" />
              <CircularProgress percent={75} size={90} color="var(--accent)" label="Water" />
            </div>
          </GlassCard>

          {/* Profile Quick Links */}
          <GlassCard delay={0.3}>
            <div className="chart-card-title">
              <span>Quick Shortcuts</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <button 
                onClick={() => navigate('/parent/child')}
                className="btn-premium"
                style={{ width: '100%', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', gap: '6px' }}
              >
                <Baby size={16} /> View Profile & Milestones <ArrowRight size={14} />
              </button>
              <button 
                onClick={() => navigate('/parent/updates')}
                className="btn-glass"
                style={{ width: '100%', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', gap: '6px' }}
              >
                <Activity size={16} /> View Detailed Log Timeline <ArrowRight size={14} />
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Right: Notices & Teacher Messages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Notices */}
          <GlassCard delay={0.4}>
            <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '10px', marginBottom: '15px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Bell size={18} style={{ color: 'var(--primary)' }} /> Alerts & Announcements
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '10px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '10px' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>School Sanitization drive</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Daycare closed this Saturday for advanced sanitization auditing.</p>
              </div>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--card-border)', borderRadius: '10px' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Yoga prep next Monday</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Please send a soft yoga mat with kids for morning circles.</p>
              </div>
            </div>
          </GlassCard>

          {/* Teacher inbox communications */}
          <GlassCard delay={0.5}>
            <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '10px', marginBottom: '15px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageSquare size={18} style={{ color: 'var(--secondary)' }} /> Contact Teacher
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
              <div className="profile-avatar" style={{ width: '36px', height: '36px' }}>AS</div>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block' }}>Aanya Sharma</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Class Mentor • Playgroup A</span>
              </div>
              <button 
                onClick={() => navigate('/parent/messages')}
                className="btn-glass"
                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              >
                Chat
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
