/* src/pages/admin/Reports.jsx */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Award } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { 
  attendanceTrendData, complianceOverviewData, 
  teacherRadarPerformance, mockTeachers, mockChildren 
} from '../../data/mockData';
import '../../styles/pages.css';

const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

const Reports = () => {
  const [activeTab, setActiveTab] = useState('teacher');
  const [selectedTeacherId, setSelectedTeacherId] = useState('t1');
  const [selectedKidId, setSelectedKidId] = useState('c1');

  const activeTeacher = mockTeachers.find(t => t.id === selectedTeacherId) || mockTeachers[0];
  const activeKid = mockChildren.find(k => k.id === selectedKidId) || mockChildren[0];

  return (
    <div className="page-container">
      <div className="roster-header-bar">
        <div className="login-tabs" style={{ marginBottom: 0 }}>
          <button 
            className={`login-tab-btn ${activeTab === 'teacher' ? 'active' : ''}`}
            onClick={() => setActiveTab('teacher')}
            style={{ minWidth: '150px' }}
          >
            Teacher Performance
          </button>
          <button 
            className={`login-tab-btn ${activeTab === 'child' ? 'active' : ''}`}
            onClick={() => setActiveTab('child')}
            style={{ minWidth: '150px' }}
          >
            Child Development
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {activeTab === 'teacher' ? (
            <select 
              className="input-glass"
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              style={{ width: '200px', padding: '6px 12px' }}
            >
              {mockTeachers.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          ) : (
            <select 
              className="input-glass"
              value={selectedKidId}
              onChange={(e) => setSelectedKidId(e.target.value)}
              style={{ width: '200px', padding: '6px 12px' }}
            >
              {mockChildren.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'teacher' && (
            <div>
              <div className="dashboard-charts-grid">
                <GlassCard delay={0.1}>
                  <div className="chart-card-title">
                    <span>Performance Matrix Radar</span>
                    <span className="badge success">{activeTeacher.name}</span>
                  </div>
                  <div style={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ResponsiveContainer>
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={teacherRadarPerformance}>
                        <PolarGrid stroke="var(--divider)" />
                        <PolarAngleAxis dataKey="subject" stroke="var(--text-tertiary)" style={{ fontSize: '0.75rem' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="var(--text-tertiary)" style={{ fontSize: '0.75rem' }} />
                        <Radar name={activeTeacher.name} dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.3} />
                        <Radar name="Intellitots Avg" dataKey="B" stroke="var(--secondary)" fill="var(--secondary)" fillOpacity={0.1} />
                        <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>

                <GlassCard delay={0.2}>
                  <div className="chart-card-title">
                    <span>Attendance & Task Quality trend</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Historical View</span>
                  </div>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <LineChart data={attendanceTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--divider)" />
                        <XAxis dataKey="name" stroke="var(--text-tertiary)" style={{ fontSize: '0.8rem' }} />
                        <YAxis stroke="var(--text-tertiary)" style={{ fontSize: '0.8rem' }} />
                        <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '10px', color: 'var(--text-primary)' }} />
                        <Line type="monotone" dataKey="Teachers" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>
              </div>

              <GlassCard delay={0.3} className="dashboard-table-card">
                <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '10px', marginBottom: '15px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={20} style={{ color: 'var(--primary)' }} />
                    Evaluation Summary Details: <strong>{activeTeacher.name}</strong>
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div style={{ padding: '15px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Performance Index</h4>
                    <strong style={{ fontSize: '1.8rem', color: 'var(--primary)' }}>{activeTeacher.performance}/100</strong>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Top 5% school percentile</p>
                  </div>

                  <div style={{ padding: '15px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Compliance Auditor Rank</h4>
                    <strong style={{ fontSize: '1.8rem', color: 'var(--secondary)' }}>{activeTeacher.complianceScore}%</strong>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Satisfies sanitization rules</p>
                  </div>

                  <div style={{ padding: '15px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Duties Logged</h4>
                    <strong style={{ fontSize: '1.8rem', color: 'var(--accent)' }}>{activeTeacher.tasksCompleted} Tasks</strong>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Zero overdue files logged</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === 'child' && (
            <div>
              <div className="dashboard-charts-grid">
                <GlassCard delay={0.1}>
                  <div className="chart-card-title">
                    <span>Growth Milestones Progress</span>
                    <span className="badge info">{activeKid.name}</span>
                  </div>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart data={activeKid.milestones} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--divider)" />
                        <XAxis type="number" domain={[0, 100]} stroke="var(--text-tertiary)" style={{ fontSize: '0.8rem' }} />
                        <YAxis dataKey="name" type="category" stroke="var(--text-tertiary)" style={{ fontSize: '0.8rem' }} width={120} />
                        <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--text-primary)' }} />
                        <Bar dataKey="progress" fill="var(--primary)" radius={[0, 4, 4, 0]}>
                          {activeKid.milestones.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>

                <GlassCard delay={0.2}>
                  <div className="chart-card-title">
                    <span>Curriculum coverage segments</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Subject breakdown</span>
                  </div>
                  <div style={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '50%', height: '100%' }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--text-primary)' }} />
                          <Pie
                            data={complianceOverviewData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={75}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {complianceOverviewData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '10px' }}>
                      {complianceOverviewData.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS[idx % COLORS.length], display: 'inline-block' }}></span>
                          <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </div>

              <GlassCard delay={0.3} className="dashboard-table-card">
                <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '10px', marginBottom: '15px' }}>
                  <span>Development Summary for <strong>{activeKid.name}</strong></span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <p>• Language proficiency is <strong>Excellent</strong>. Speaks clear sentences, can recognize and recite alphabet letters A-Z.</p>
                  <p>• Fine motor skills show <strong>Steady Progress</strong>. Can hold crayons and trace simple geometric shapes (Circles, Squares).</p>
                  <p>• Social metrics are <strong>Highly Positive</strong>. Shows great cooperative sharing patterns and guides classmates during block buildings.</p>
                </div>
              </GlassCard>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Reports;
