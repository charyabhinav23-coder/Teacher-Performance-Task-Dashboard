/* src/pages/admin/StaffAttendance.jsx */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Check, X, Calendar, FileClock, UserCheck, AlertTriangle } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import CountUp from '../../components/CountUp';
import { mockTeachers, staffAttendanceHeatmap, attendanceTrendData } from '../../data/mockData';
import '../../styles/pages.css';

const StaffAttendance = () => {
  const { success } = useNotifications();
  const [attendanceState, setAttendanceState] = useState(
    mockTeachers.reduce((acc, t) => {
      acc[t.id] = 'present';
      return acc;
    }, {})
  );

  const handleStatusChange = (teacherId, status) => {
    setAttendanceState(prev => ({ ...prev, [teacherId]: status }));
    const teacher = mockTeachers.find(t => t.id === teacherId);
    success('Attendance Logged', `${teacher.name} marked as ${status.toUpperCase()}.`);
  };

  const getHeatmapColorClass = (level) => {
    switch (level) {
      case 3: return 'level-3';
      case 2: return 'level-2';
      case 1: return 'level-1';
      default: return 'level-0';
    }
  };

  const getHeatmapLabel = (level) => {
    if (level === 3) return 'Excellent (95%+)';
    if (level === 2) return 'Good (90%-95%)';
    if (level === 1) return 'Low (<90%)';
    return 'Weekend/Closed';
  };

  const stats = [
    { title: 'Today\'s Attendance', value: 95.8, suffix: '%', icon: UserCheck, color: 'var(--success)' },
    { title: 'Excused Leave', value: 1, suffix: ' Staff', icon: FileClock, color: 'var(--warning)' },
    { title: 'Unexcused Absences', value: 0, suffix: ' Staff', icon: AlertTriangle, color: 'var(--danger)' },
  ];

  return (
    <div className="page-container">
      <div className="kpi-grid">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={idx} delay={idx * 0.1} className="kpi-card">
              <div className="kpi-details">
                <h3>{stat.title}</h3>
                <div className="kpi-value">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                  Active tracker
                </span>
              </div>
              <div className="kpi-icon-wrapper" style={{ color: stat.color, background: `${stat.color}15` }}>
                <Icon size={24} />
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="dashboard-charts-grid">
        <GlassCard delay={0.2} className="dashboard-table-card">
          <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '10px', marginBottom: '15px' }}>
            <span>Staff Attendance Registry</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>June 15, 2026</span>
          </div>

          <div className="table-wrapper">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Class</th>
                  <th>Shift Time</th>
                  <th>Registry Status</th>
                </tr>
              </thead>
              <tbody>
                {mockTeachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="profile-avatar" style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}>
                          {teacher.avatar}
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{teacher.name}</span>
                      </div>
                    </td>
                    <td>{teacher.assignedClass}</td>
                    <td>{teacher.shiftTime}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => handleStatusChange(teacher.id, 'present')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            background: attendanceState[teacher.id] === 'present' ? 'var(--success)' : 'rgba(0,0,0,0.05)',
                            color: attendanceState[teacher.id] === 'present' ? 'white' : 'var(--text-secondary)',
                            transition: 'all var(--transition-fast)'
                          }}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(teacher.id, 'absent')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            background: attendanceState[teacher.id] === 'absent' ? 'var(--danger)' : 'rgba(0,0,0,0.05)',
                            color: attendanceState[teacher.id] === 'absent' ? 'white' : 'var(--text-secondary)',
                            transition: 'all var(--transition-fast)'
                          }}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => handleStatusChange(teacher.id, 'leave')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            background: attendanceState[teacher.id] === 'leave' ? 'var(--warning)' : 'rgba(0,0,0,0.05)',
                            color: attendanceState[teacher.id] === 'leave' ? 'white' : 'var(--text-secondary)',
                            transition: 'all var(--transition-fast)'
                          }}
                        >
                          Leave
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard delay={0.3}>
          <div className="chart-card-title">
            <span>Staff Attendance Trend</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Weekly Overview</span>
          </div>
          <div style={{ width: '100%', height: 260 }}>
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

      <GlassCard delay={0.4} className="dashboard-table-card">
        <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '10px', marginBottom: '15px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20} style={{ color: 'var(--primary)' }} />
            Animated Attendance Heatmap
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Last 4 Weeks Density</span>
        </div>

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {[3, 2, 1, 0].map((lvl) => (
            <div key={lvl} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
              <span className={`heatmap-cell ${getHeatmapColorClass(lvl)}`} style={{ width: '20px', height: '20px', display: 'inline-block', borderRadius: '4px' }}></span>
              <span style={{ color: 'var(--text-secondary)' }}>{getHeatmapLabel(lvl)}</span>
            </div>
          ))}
        </div>

        <div className="attendance-grid-container">
          <div className="heatmap-grid">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="heatmap-header">{day}</div>
            ))}

            {staffAttendanceHeatmap.map((item, idx) => (
              <React.Fragment key={idx}>
                <motion.div 
                  className={`heatmap-cell ${getHeatmapColorClass(item.week1)}`}
                  whileHover={{ scale: 1.1 }}
                  title={`${item.day} - Week 1: ${getHeatmapLabel(item.week1)}`}
                >
                  {idx + 1}
                </motion.div>
              </React.Fragment>
            ))}

            {staffAttendanceHeatmap.map((item, idx) => (
              <React.Fragment key={idx}>
                <motion.div 
                  className={`heatmap-cell ${getHeatmapColorClass(item.week2)}`}
                  whileHover={{ scale: 1.1 }}
                  title={`${item.day} - Week 2: ${getHeatmapLabel(item.week2)}`}
                >
                  {idx + 8}
                </motion.div>
              </React.Fragment>
            ))}

            {staffAttendanceHeatmap.map((item, idx) => (
              <React.Fragment key={idx}>
                <motion.div 
                  className={`heatmap-cell ${getHeatmapColorClass(item.week3)}`}
                  whileHover={{ scale: 1.1 }}
                  title={`${item.day} - Week 3: ${getHeatmapLabel(item.week3)}`}
                >
                  {idx + 15}
                </motion.div>
              </React.Fragment>
            ))}

            {staffAttendanceHeatmap.map((item, idx) => (
              <React.Fragment key={idx}>
                <motion.div 
                  className={`heatmap-cell ${getHeatmapColorClass(item.week4)}`}
                  whileHover={{ scale: 1.1 }}
                  title={`${item.day} - Week 4: ${getHeatmapLabel(item.week4)}`}
                >
                  {idx + 22}
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default StaffAttendance;
