import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, LogIn, UserPlus, Home as HomeIcon } from 'lucide-react';

export default function Navbar() {
  return (
    <nav style={{
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex'
          }}>
            <HeartHandshake size={24} color="#ffffff" />
          </div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            NGOSync
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/" className="btn btn-secondary">
            <HomeIcon size={16} /> Home
          </Link>
          <Link to="/login" className="btn btn-secondary">
            <LogIn size={16} /> Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            <UserPlus size={16} /> Join Platform
          </Link>
        </div>
      </div>
    </nav>
  );
}
