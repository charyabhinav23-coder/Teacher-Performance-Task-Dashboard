/* src/components/Layout.jsx */
import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';
import { 
  LayoutDashboard, 
  Users, 
  Baby, 
  Calendar, 
  CheckSquare, 
  Clock, 
  BarChart3, 
  Megaphone, 
  Settings, 
  LogOut, 
  Sun, 
  Moon, 
  Sparkles, 
  ChevronLeft, 
  Bell, 
  Search,
  MessageSquare,
  Activity,
  FileText,
  BookOpen
} from 'lucide-react';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const { info } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const activeRole = localStorage.getItem('activeRole') || 'parent';
  const activeUser = localStorage.getItem('activeUser') || '';

  const handleLogout = () => {
    localStorage.removeItem('activeRole');
    localStorage.removeItem('activeUser');
    info('Logged Out', 'You have been successfully logged out.');
    navigate('/', { replace: true });
  };

  const getMenuItems = () => {
    if (activeRole === 'admin') {
      return [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Teachers', path: '/admin/teachers', icon: Users },
        { name: 'Students', path: '/admin/students', icon: Baby },
        { name: 'Staff Attendance', path: '/admin/attendance', icon: Calendar },
        { name: 'Task Board', path: '/admin/tasks', icon: CheckSquare },
        { name: 'Duty Roster', path: '/admin/roster', icon: Clock },
        { name: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
        { name: 'Announcements', path: '/admin/announcements', icon: Megaphone },
        { name: 'Settings', path: '/settings', icon: Settings }
      ];
    } else if (activeRole === 'teacher') {
      return [
        { name: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
        { name: 'My Class', path: '/teacher/class', icon: Users },
        { name: 'Attendance', path: '/teacher/attendance', icon: Calendar },
        { name: 'Daily Routine Log', path: '/teacher/routinelog', icon: FileText },
        { name: 'My Tasks', path: '/teacher/tasks', icon: CheckSquare },
        { name: 'Student Notes', path: '/teacher/notes', icon: BookOpen },
        { name: 'Announcements', path: '/teacher/announcements', icon: Megaphone },
        { name: 'Profile', path: '/teacher/profile', icon: Settings }
      ];
    } else {
      // Parent
      return [
        { name: 'Dashboard', path: '/parent/dashboard', icon: LayoutDashboard },
        { name: 'My Child', path: '/parent/child', icon: Baby },
        { name: 'Daily Updates', path: '/parent/updates', icon: Activity },
        { name: 'Activity Timeline', path: '/parent/timeline', icon: Clock },
        { name: 'Teacher Notes', path: '/parent/notes', icon: FileText },
        { name: 'Announcements', path: '/parent/announcements', icon: Megaphone },
        { name: 'Messages', path: '/parent/messages', icon: MessageSquare },
        { name: 'Profile', path: '/parent/profile', icon: Settings }
      ];
    }
  };

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('firstcry');
    else setTheme('light');
  };

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun size={20} />;
    if (theme === 'dark') return <Moon size={20} />;
    return <Sparkles size={20} />;
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'Light Theme';
    if (theme === 'dark') return 'Dark Theme';
    return 'FirstCry Theme';
  };

  const menuItems = getMenuItems();

  const getPageTitle = () => {
    const activeItem = menuItems.find(item => location.pathname === item.path);
    return activeItem ? activeItem.name : 'Intellitots Portal';
  };

  const getRoleBadgeColor = () => {
    if (activeRole === 'admin') return 'rgba(139, 92, 246, 0.15)';
    if (activeRole === 'teacher') return 'rgba(236, 72, 153, 0.15)';
    return 'rgba(59, 130, 246, 0.15)';
  };

  const getRoleLabel = () => {
    if (activeRole === 'admin') return 'Administrator';
    if (activeRole === 'teacher') return 'Class Teacher';
    return 'Parent Account';
  };

  const getUserInitials = () => {
    if (activeRole === 'admin') return 'AD';
    if (activeRole === 'teacher') return 'TS';
    return 'SP';
  };

  const getUserName = () => {
    if (activeRole === 'admin') return 'Admin Deshmukh';
    if (activeRole === 'teacher') return 'Aanya Sharma';
    return 'Sanjay Patel';
  };

  return (
    <div className="app-layout">
      {/* Background Orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Sidebar */}
      <aside className={`app-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo-img">FC</div>
          <span className="sidebar-brand-name">FC Intellitots</span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                title={item.name}
              >
                <Icon size={20} style={{ flexShrink: 0 }} />
                <span className="sidebar-link-text">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link" onClick={handleLogout} style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left' }}>
            <LogOut size={20} style={{ flexShrink: 0 }} />
            <span className="sidebar-link-text">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="main-content">
        {/* Header */}
        <header className="app-header">
          <div className="header-left">
            <button 
              className="sidebar-toggle-btn"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Toggle Sidebar"
            >
              <ChevronLeft size={20} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
            </button>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {getPageTitle()}
            </h1>
          </div>

          <div className="header-right">
            {/* Search */}
            <div className="header-search">
              <Search size={16} />
              <input type="text" placeholder="Search records..." />
            </div>

            {/* Theme Toggle */}
            <button 
              className="header-action-btn"
              onClick={toggleTheme}
              title={`Switch Theme (Current: ${getThemeLabel()})`}
            >
              {getThemeIcon()}
            </button>

            {/* Notification bell */}
            <button 
              className="header-action-btn"
              onClick={() => info('Notification Feed', 'School announcements list synchronized.')}
            >
              <Bell size={20} />
              <span className="btn-badge"></span>
            </button>

            {/* Profile */}
            <div className="user-profile-menu">
              <div className="profile-avatar" style={{ background: getRoleBadgeColor() }}>{getUserInitials()}</div>
              <div className="profile-info">
                <span className="profile-name">{getUserName()}</span>
                <span className="profile-role">{getRoleLabel()}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
