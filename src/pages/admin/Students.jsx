/* src/pages/admin/Students.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Baby, User, Phone, Search, ArrowRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { mockChildren } from '../../data/mockData';
import '../../styles/pages.css';

const Students = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKids = mockChildren.filter(kid => 
    kid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kid.assignedClass.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      {/* Search and Filters */}
      <div className="roster-header-bar" style={{ gap: '15px', flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Search enrollment details, parent sync cards, and behavior indices
        </h2>
        
        <div className="header-search" style={{ width: '320px', background: 'rgba(255,255,255,0.15)' }}>
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search by name or class..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="roster-grid">
        {filteredKids.map((kid, index) => (
          <GlassCard key={kid.id} delay={index * 0.05} className="roster-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="badge info">{kid.assignedClass}</span>
              <span style={{ fontSize: '1.2rem' }}>
                {kid.mood === 'Happy' ? '😊' : kid.mood === 'Energetic' ? '⚡' : '🧐'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '15px 0' }}>
              <div className="profile-avatar" style={{ width: '45px', height: '45px', background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)', color: 'white', fontSize: '1.2rem' }}>
                {kid.avatar}
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{kid.name}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Age: {kid.age}</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--divider)', paddingTop: '10px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Parent Contact</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{kid.parentName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Phone Number</span>
                <span style={{ color: 'var(--text-secondary)' }}>{kid.parentContact}</span>
              </div>
            </div>

            <motion.button 
              onClick={() => navigate(`/child/${kid.id}`)}
              className="btn-glass"
              style={{ width: '100%', marginTop: '15px', padding: '8px', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', gap: '6px' }}
              whileHover={{ scale: 1.02 }}
            >
              View Growth Timeline <ArrowRight size={14} />
            </motion.button>
          </GlassCard>
        ))}

        {filteredKids.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-tertiary)', padding: '40px' }}>
            No students found matching your query
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
