import React, { useState, useEffect } from 'react';
import { fetchEvents, applyForEvent } from '../services/api';
import { Users, Calendar, MapPin, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Volunteers() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const { user } = useAuth();
  const navigate = useNavigate();

  const loadEvents = async () => {
    try {
      setLoading(true);
      const res = await fetchEvents();
      if (res.success) {
        setEvents(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleApply = async (eventId) => {
    if (!user) {
      alert('Please log in to apply for volunteer opportunities.');
      navigate('/login');
      return;
    }

    try {
      setApplyingId(eventId);
      setMessage({ type: '', text: '' });
      const res = await applyForEvent(eventId);
      if (res.success) {
        setMessage({ type: 'success', text: 'Success! You have registered for this event.' });
        loadEvents();
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Application failed.' });
    } finally {
      setApplyingId(null);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Users color="#10b981" size={28} />
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800' }}>Volunteer Opportunities</h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Lend a helping hand. Connect directly with non-profits organizing local and regional community events.
        </p>
      </div>

      {message.text && (
        <div style={{
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem',
          fontSize: '0.95rem',
          background: message.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: `1px solid ${message.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          color: message.type === 'success' ? '#10b981' : '#f87171',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Loading volunteer events...</p>
      ) : events.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>No volunteer events scheduled at this time.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {events.map((ev) => {
            const isEnrolled = user && ev.registeredVolunteers?.includes(user._id);
            const spotsRemaining = ev.capacity - (ev.registeredVolunteers?.length || 0);

            return (
              <div key={ev._id} className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '50px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {ev.organizationName}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    {spotsRemaining > 0 ? `${spotsRemaining} spots left` : 'Fully Booked'}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{ev.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                  {ev.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} color="#6366f1" />
                    <span>Date: {ev.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} color="#f59e0b" />
                    <span>Location: {ev.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(ev._id)}
                  disabled={isEnrolled || spotsRemaining <= 0 || applyingId === ev._id}
                  className={`btn ${isEnrolled ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {isEnrolled ? (
                    <>
                      <UserCheck size={16} /> Enrolled
                    </>
                  ) : applyingId === ev._id ? (
                    'Applying...'
                  ) : (
                    'Apply as Volunteer'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
