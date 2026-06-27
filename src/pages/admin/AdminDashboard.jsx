/* src/pages/admin/AdminDashboard.jsx */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Users, CheckSquare, ShieldCheck, AlertCircle, 
  TrendingUp, TrendingDown, ArrowRight, Award, School 
} from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import CountUp from '../../components/CountUp';
import { 
  mockTeachers, mockTasks, attendanceTrendData, 
  taskCompletionData, complianceOverviewData, performanceDistributionData 
} from '../../data/mockData';
import '../../styles/pages.css';

const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

const AdminDashboard = () => {
  const totalTeachers = mockTeachers.length;
  const totalStudents = 320; 
  const averageAttendance = 94.2;
  const pendingTasksCount = mockTasks.filter(t => t.status !== 'completed').length;
  const overdueTasksCount = mockTasks.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date()).length;
  const curriculumCoverage = 95.8;

  const kpis = [
    { title: 'Total Teachers', value: totalTeachers, suffix: '', trend: '+2 this month', isUp: true, icon: Users, delay: 0 },
    { title: 'Total Students', value: totalStudents, suffix: '', trend: '+15 this term', isUp: true, icon: School, delay: 0.1 },
    { title: 'Teacher Attendance', value: averageAttendance, suffix: '%', trend: '+0.5% vs last week', isUp: true, icon: TrendingUp, delay: 0.2 },
    { title: 'Pending Tasks', value: pendingTasksCount, suffix: '', trend: '-3 since yesterday', isUp: false, icon: CheckSquare, delay: 0.3 },
    { title: 'Overdue Tasks', value: overdueTasksCount, suffix: '', trend: '+1 since Monday', isUp: false, icon: AlertCircle, delay: 0.4 },
    { title: 'Curriculum Coverage', value: curriculumCoverage, suffix: '%', trend: '+1.2% ahead', isUp: true, icon: ShieldCheck, delay: 0.5 }
  ];

  return (
    <div className="page-container">
      <div className="kpi-grid">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <GlassCard key={index} delay={kpi.delay} className="kpi-card">
              <div className="kpi-details">
                <h3>{kpi.title}</h3>
                <div className="kpi-value">
                  <CountUp value={kpi.value} suffix={kpi.suffix} />
                </div>
                <span className={`kpi-trend ${kpi.isUp ? 'up' : 'down'}`}>
                  {kpi.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.trend}
                </span>
              </div>
              <div className="kpi-icon-wrapper">
                <Icon size={24} />
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="dashboard-charts-grid">
        <GlassCard delay={0.2}>
          <div className="chart-card-title">
            <span>Teacher & Student Attendance Trend</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Weekly View</span>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={attendanceTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--divider)" />
                <XAxis dataKey="name" stroke="var(--text-tertiary)" style={{ fontSize: '0.8rem' }} />
                <YAxis stroke="var(--text-tertiary)" style={{ fontSize: '0.8rem' }} />
                <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '10px', backdropFilter: 'blur(10px)', color: 'var(--text-primary)' }} />
                <Legend wrapperStyle={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} />
                <Line type="monotone" dataKey="Teachers" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Students" stroke="var(--secondary)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard delay={0.3}>
          <div className="chart-card-title">
            <span>Task Completion Rate</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Monthly History</span>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={taskCompletionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--divider)" />
                <XAxis dataKey="name" stroke="var(--text-tertiary)" style={{ fontSize: '0.8rem' }} />
                <YAxis stroke="var(--text-tertiary)" style={{ fontSize: '0.8rem' }} />
                <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '10px', backdropFilter: 'blur(10px)', color: 'var(--text-primary)' }} />
                <Legend wrapperStyle={{ fontSize: '0.85rem' }} />
                <Bar dataKey="Completed" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Pending" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Overdue" fill="var(--danger)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="dashboard-charts-grid">
        <GlassCard delay={0.4}>
          <div className="chart-card-title">
            <span>Compliance Audit Score</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Topic Breakdown</span>
          </div>
          <div style={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '55%', height: '100%' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '10px', backdropFilter: 'blur(10px)', color: 'var(--text-primary)' }} />
                  <Pie
                    data={complianceOverviewData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
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
            <div style={{ width: '45%', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '10px' }}>
              {complianceOverviewData.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: COLORS[idx % COLORS.length], display: 'inline-block' }}></span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.name}: <strong>{item.value}%</strong></span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard delay={0.5}>
          <div className="chart-card-title">
            <span>Teacher Performance Distribution</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Score Tiers</span>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={performanceDistributionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--divider)" />
                <XAxis dataKey="score" stroke="var(--text-tertiary)" style={{ fontSize: '0.8rem' }} />
                <YAxis stroke="var(--text-tertiary)" style={{ fontSize: '0.8rem' }} />
                <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '10px', backdropFilter: 'blur(10px)', color: 'var(--text-primary)' }} />
                <Area type="monotone" dataKey="count" stroke="var(--primary)" fillOpacity={1} fill="url(#colorCount)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Teachers Performance Table */}
      <GlassCard delay={0.6} className="dashboard-table-card">
        <div className="chart-card-title" style={{ borderBottom: '1px solid var(--divider)', paddingBottom: '15px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} style={{ color: 'var(--primary)' }} />
            Teacher Performance & Summary
          </span>
        </div>
        <div className="table-wrapper">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Teacher Name</th>
                <th>Assigned Class</th>
                <th>Shift Details</th>
                <th>Attendance</th>
                <th>Compliance</th>
                <th>Performance Score</th>
              </tr>
            </thead>
            <tbody>
              {mockTeachers.map((teacher, index) => (
                <tr key={index}>
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
                    <span className="badge success">{teacher.attendance}%</span>
                  </td>
                  <td>{teacher.complianceScore}%</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '100px', height: '8px', background: 'var(--divider)', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${teacher.performance}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}></div>
                      </div>
                      <strong style={{ color: 'var(--text-primary)' }}>{teacher.performance}/100</strong>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default AdminDashboard;
