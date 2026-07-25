import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2rem 0',
      marginTop: '4rem',
      background: 'rgba(15, 23, 42, 0.9)',
      textAlign: 'center',
      color: 'var(--text-muted)'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          Built with <Heart size={16} color="#ef4444" fill="#ef4444" /> for non-profits worldwide.
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} NGOSync Platform. Phase 1 Base Infrastructure.
        </p>
      </div>
    </footer>
  );
}
