/* src/pages/auth/Login.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { Sparkles, Heart, Shield, Lock, Mail, Loader2 } from 'lucide-react';
import '../../styles/pages.css';

const ACCOUNTS = [
  // Admin
  { email: 'vaitlabinnu@gmail.com', password: 'Binnu2007', role: 'admin', name: 'Admin Deshmukh' },
  // Teachers
  { email: 'prithika@gmail.com', password: 'Prithika123', role: 'teacher', name: 'Prithika Sharma' },
  { email: 'varun@gmail.com', password: 'Varun123', role: 'teacher', name: 'Varun Mehta' },
  { email: 'raju@gmail.com', password: 'Raju123', role: 'teacher', name: 'Raju Sen' },
  // Parents
  { email: 'neha@gmail.com', password: 'neha@1213', role: 'parent', name: 'Neha Patel' },
  { email: 'Nani@gmail.com', password: 'Nani123', role: 'parent', name: 'Nani Sen' }
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const navigate = useNavigate();
  const { success, error } = useNotifications();

  useEffect(() => {
    const activeRole = localStorage.getItem('activeRole');
    if (activeRole) {
      navigate(`/${activeRole}/dashboard`, { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      error('Fields Missing', 'Please fill in both email and password.');
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
      return;
    }

    setIsLoading(true);

    // Simulate network delay for premium feel
    setTimeout(() => {
      const match = ACCOUNTS.find(
        (acc) => acc.email.toLowerCase() === email.trim().toLowerCase() && acc.password === password
      );

      if (match) {
        // Save session details
        localStorage.setItem('activeRole', match.role);
        localStorage.setItem('activeUser', JSON.stringify({ name: match.name, email: match.email, role: match.role }));
        
        success('Login Successful', `Welcome back, ${match.name}!`);
        setIsLoading(false);

        // Redirect based on role
        if (match.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (match.role === 'teacher') {
          navigate('/teacher/dashboard');
        } else {
          navigate('/parent/dashboard');
        }
      } else {
        error('Invalid Credentials', 'The email or password you entered is incorrect.');
        setPassword(''); // Clear only password field
        setIsLoading(false);
        setIsError(true); // Triggers shake animation
        setTimeout(() => setIsError(false), 500);
      }
    }, 1200);
  };

  const floatingIcons = [
    { icon: Sparkles, color: 'var(--primary)', top: '15%', left: '20%', delay: 0 },
    { icon: Heart, color: 'var(--secondary)', top: '65%', left: '15%', delay: 1.5 },
    { icon: Shield, color: 'var(--accent)', top: '40%', left: '75%', delay: 0.8 },
  ];

  return (
    <div className="login-container">
      {/* Decorative Orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      {/* Illustration Side */}
      <div className="login-illustration-side">
        <motion.div 
          className="login-brand"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="login-brand-logo">FC</div>
          <span className="login-brand-text">FC Intellitots</span>
        </motion.div>

        <div className="illustration-graphic">
          <motion.div
            className="glass-card"
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: 'spring' }}
          >
            <motion.h2 
              style={{ fontSize: '1.8rem', fontWeight: 800, textAlign: 'center', color: 'var(--text-primary)', marginBottom: '10px' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              Nurturing Minds, Shaping Futures
            </motion.h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '300px', fontSize: '0.95rem' }}>
              FirstCry Intellitots premium dashboard for school staff, teachers, and parent coordination.
            </p>
          </motion.div>

          {floatingIcons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className="floating-icon-orb"
                style={{ top: item.top, left: item.left, color: item.color }}
                animate={{ y: [0, -15, 0], rotate: [0, 15, -15, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  delay: item.delay,
                  ease: 'easeInOut'
                }}
              >
                <Icon size={24} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Form Side */}
      <div className="login-form-side">
        <motion.div 
          style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}
          animate={isError ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Portal Sign In
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Enter your credentials to access your Intellitots portal.
            </p>
          </motion.div>

          <form onSubmit={handleLogin}>
            <div className="login-form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="input-glass"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '45px' }}
                  disabled={isLoading}
                />
                <Mail size={18} style={{ position: 'absolute', left: '15px', top: '17px', color: 'var(--text-tertiary)' }} />
              </div>
            </div>

            <div className="login-form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="input-glass"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '45px' }}
                  disabled={isLoading}
                />
                <Lock size={18} style={{ position: 'absolute', left: '15px', top: '17px', color: 'var(--text-tertiary)' }} />
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn-premium"
              style={{ width: '100%', marginTop: '10px' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Verifying account...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
      
      {/* Inline styles for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
