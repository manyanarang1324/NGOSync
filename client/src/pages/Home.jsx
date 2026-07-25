import React, { useEffect, useState } from 'react';
import { Users, Globe, ShieldCheck, Heart, ArrowRight, Activity } from 'lucide-react';
import { checkHealth } from '../services/api';

export default function Home() {
  const [serverStatus, setServerStatus] = useState({ loading: true, online: false, message: '' });

  useEffect(() => {
    checkHealth()
      .then((data) => {
        setServerStatus({ loading: false, online: true, message: data.service });
      })
      .catch(() => {
        setServerStatus({ loading: false, online: false, message: 'Backend Offline / Connecting...' });
      });
  }, []);

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      {/* Hero Banner */}
      <div className="glass-panel" style={{
        padding: '3.5rem 2.5rem',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
        marginBottom: '3rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: '50px',
          background: serverStatus.online ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
          border: `1px solid ${serverStatus.online ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
          fontSize: '0.85rem',
          color: serverStatus.online ? '#10b981' : '#f59e0b',
          marginBottom: '1.5rem'
        }}>
          <Activity size={16} />
          <span>API Status: {serverStatus.loading ? 'Checking...' : serverStatus.message}</span>
        </div>

        <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '1rem' }}>
          Synchronizing <span style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>NGO Operations</span> & Social Impact
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '650px', marginBottom: '2rem' }}>
          NGOSync empowers non-profit organizations with modern tools to manage donors, coordinate volunteers, track campaigns, and maximize community outreach transparently.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/register" className="btn btn-primary">
            Get Started <ArrowRight size={18} />
          </a>
          <a href="/login" className="btn btn-secondary">
            Organization Portal
          </a>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Platform Features</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        <div className="glass-panel" style={{ padding: '1.8rem' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.15)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Users color="#6366f1" size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Volunteer Coordination</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Recruit, schedule, and engage volunteers for social causes and local events effortlessly.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '1.8rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Heart color="#10b981" size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Transparent Donating</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Direct financial and material contributions with real-time progress reporting.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '1.8rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Globe color="#f59e0b" size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Global Campaign Sync</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Synchronize Multi-NGO campaigns, share resources, and amplify total community impact.
          </p>
        </div>
      </div>
    </div>
  );
}
