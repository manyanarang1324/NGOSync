import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createCampaign, createEvent, fetchMyDonations } from '../services/api';
import { LayoutDashboard, PlusCircle, Heart, Calendar, ShieldCheck, Award, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // NGO Admin Form State
  const [campForm, setCampForm] = useState({
    title: '', description: '', category: 'Education', targetAmount: 10000, image: ''
  });
  const [eventForm, setEventForm] = useState({
    title: '', description: '', location: '', date: '', capacity: 25
  });

  // Donor State
  const [myDonations, setMyDonations] = useState([]);
  const [formMsg, setFormMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user && user.role === 'donor') {
      fetchMyDonations()
        .then((res) => {
          if (res.success) setMyDonations(res.data);
        })
        .catch(console.error);
    }
  }, [user]);

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      setFormMsg({ type: '', text: '' });
      const res = await createCampaign(campForm);
      if (res.success) {
        setFormMsg({ type: 'success', text: 'Campaign created successfully!' });
        setCampForm({ title: '', description: '', category: 'Education', targetAmount: 10000, image: '' });
      }
    } catch (err) {
      setFormMsg({ type: 'error', text: err.response?.data?.message || 'Failed to create campaign' });
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      setFormMsg({ type: '', text: '' });
      const res = await createEvent(eventForm);
      if (res.success) {
        setFormMsg({ type: 'success', text: 'Volunteer event created successfully!' });
        setEventForm({ title: '', description: '', location: '', date: '', capacity: 25 });
      }
    } catch (err) {
      setFormMsg({ type: 'error', text: err.response?.data?.message || 'Failed to create event' });
    }
  };

  if (!user) return null;

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      {/* User Greeting & Stats Banner */}
      <div className="glass-panel" style={{
        padding: '2rem 2.5rem',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
        marginBottom: '2.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              padding: '0.2rem 0.75rem',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase'
            }}>
              Role: {user.role.replace('_', ' ')}
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Welcome, {user.name}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {user.organizationName ? `Organization: ${user.organizationName}` : user.email}
          </p>
        </div>

        {/* Quick Stat Pill */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          background: 'rgba(15, 23, 42, 0.6)',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Status</div>
            <div style={{ color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={16} /> Verified Active
            </div>
          </div>
        </div>
      </div>

      {formMsg.text && (
        <div style={{
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem',
          fontSize: '0.95rem',
          background: formMsg.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: formMsg.type === 'success' ? '#10b981' : '#f87171'
        }}>
          {formMsg.text}
        </div>
      )}

      {/* Role Specific Views */}
      {user.role === 'ngo_admin' || user.role === 'super_admin' ? (
        <div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={() => setActiveTab('overview')}
              className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <TrendingUp size={16} /> Overview Stats
            </button>
            <button
              onClick={() => setActiveTab('new_campaign')}
              className={`btn ${activeTab === 'new_campaign' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <PlusCircle size={16} /> Create Campaign
            </button>
            <button
              onClick={() => setActiveTab('new_event')}
              className={`btn ${activeTab === 'new_event' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <Calendar size={16} /> Schedule Volunteer Event
            </button>
          </div>

          {activeTab === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Active Campaigns</div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#6366f1' }}>3</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target: $155,000</div>
              </div>
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Total Raised</div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981' }}>$84,700</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>From 142 total donors</div>
              </div>
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Active Volunteers</div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#f59e0b' }}>80+</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered across 2 drives</div>
              </div>
            </div>
          )}

          {activeTab === 'new_campaign' && (
            <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Launch New Campaign</h3>
              <form onSubmit={handleCreateCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Campaign Title"
                  required
                  value={campForm.title}
                  onChange={(e) => setCampForm({ ...campForm, title: e.target.value })}
                  style={{ padding: '0.75rem', background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
                />
                <textarea
                  placeholder="Campaign Description & Goals"
                  required
                  rows="3"
                  value={campForm.description}
                  onChange={(e) => setCampForm({ ...campForm, description: e.target.value })}
                  style={{ padding: '0.75rem', background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <select
                    value={campForm.category}
                    onChange={(e) => setCampForm({ ...campForm, category: e.target.value })}
                    style={{ flex: 1, padding: '0.75rem', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
                  >
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Disaster Relief">Disaster Relief</option>
                    <option value="Environment">Environment</option>
                    <option value="Community">Community</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Target Amount ($)"
                    required
                    value={campForm.targetAmount}
                    onChange={(e) => setCampForm({ ...campForm, targetAmount: Number(e.target.value) })}
                    style={{ flex: 1, padding: '0.75rem', background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Create & Publish Campaign</button>
              </form>
            </div>
          )}

          {activeTab === 'new_event' && (
            <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Schedule Volunteer Event</h3>
              <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Event Title"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  style={{ padding: '0.75rem', background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
                />
                <textarea
                  placeholder="Event Details & Volunteer Responsibilities"
                  required
                  rows="3"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  style={{ padding: '0.75rem', background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Location / Address"
                    required
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    style={{ flex: 1, padding: '0.75rem', background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
                  />
                  <input
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    style={{ flex: 1, padding: '0.75rem', background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Schedule Event</button>
              </form>
            </div>
          )}
        </div>
      ) : user.role === 'donor' ? (
        <div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>My Contribution History</h2>
          {myDonations.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)' }}>You haven't made any donations yet.</p>
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              {myDonations.map((d) => (
                <div key={d._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>{d.campaignId?.title || 'NGO Campaign Support'}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{new Date(d.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#10b981', fontWeight: '700', fontSize: '1.2rem' }}>+${d.amount}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{d.paymentMethod}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Volunteer Role View */
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Award color="#f59e0b" size={28} />
            <h2 style={{ fontSize: '1.5rem' }}>Volunteer Impact Profile</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Thank you for dedicating your time to social causes. Track your active shift assignments and enrolled drives.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Enrolled Events</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981' }}>1</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Volunteer Hours</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#6366f1' }}>12.5 hrs</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
