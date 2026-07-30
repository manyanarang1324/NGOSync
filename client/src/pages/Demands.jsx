import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, Plus, MapPin, CheckCircle, Heart, Users } from 'lucide-react';
import { fetchDemands, createDemand, contributeDemand } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Demands() {
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Food & Ration',
    quantityNeeded: 100,
    unit: 'Kits',
    urgency: 'High',
    location: 'New Delhi, India',
    description: '',
  });

  const loadDemands = async () => {
    try {
      setLoading(true);
      const res = await fetchDemands({ category: filterCategory });
      if (res.success) setDemands(res.data);
    } catch (err) {
      console.error('Failed to load demands', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDemands();
  }, [filterCategory]);

  const handleCreateDemand = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await createDemand(formData);
      if (res.success) {
        alert('Resource demand published successfully!');
        setShowModal(false);
        setFormData({
          title: '',
          category: 'Food & Ration',
          quantityNeeded: 100,
          unit: 'Kits',
          urgency: 'High',
          location: 'New Delhi, India',
          description: '',
        });
        loadDemands();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create resource demand.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleContribute = async (demand) => {
    if (!user) {
      alert('Please log in to contribute or volunteer for this NGO demand.');
      return;
    }
    const input = prompt(`How many ${demand.unit} would you like to contribute or fulfill for "${demand.title}"?`, "10");
    if (!input) return;
    const amount = Number(input);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive number.');
      return;
    }

    try {
      const res = await contributeDemand(demand._id, amount);
      if (res.success) {
        alert(`Thank you! Your contribution of ${amount} ${demand.unit} has been logged.`);
        loadDemands();
      }
    } catch (err) {
      alert('Failed to log contribution.');
    }
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'Critical Urgent':
        return { bg: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: 'rgba(239, 68, 68, 0.4)' };
      case 'High':
        return { bg: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: 'rgba(245, 158, 11, 0.4)' };
      default:
        return { bg: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', border: 'rgba(59, 130, 246, 0.4)' };
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.5rem 5rem' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
              <AlertTriangle size={16} /> NGO Urgent Resource & Volunteer Demands
            </div>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Live NGO Demands & Requests</h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '650px', fontSize: '1rem', lineHeight: '1.6' }}>
              NGOs publish real-time requirements for emergency food, warm clothes, medical supplies, and volunteer teams across India. Donors and volunteers can contribute directly to fulfill these critical demands.
            </p>
          </div>

          {user?.role === 'ngo_admin' && (
            <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ gap: '0.5rem' }}>
              <Plus size={18} /> Request Resource or Volunteers
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          {['', 'Food & Ration', 'Clothing & Blankets', 'Medical Supplies', 'Volunteer Force', 'Education Kits'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className="btn"
              style={{
                fontSize: '0.85rem',
                padding: '0.4rem 1rem',
                background: filterCategory === cat ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.05)',
                color: filterCategory === cat ? '#fff' : 'var(--text-muted)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px'
              }}
            >
              {cat === '' ? 'All Demands' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Demands Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          Loading live NGO demands...
        </div>
      ) : demands.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <Package size={48} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
          <h3>No active demands found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Try selecting a different category filter above.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.75rem' }}>
          {demands.map((demand) => {
            const urgencyStyle = getUrgencyBadge(demand.urgency);
            const percent = Math.min(100, Math.round((demand.quantityFulfilled / demand.quantityNeeded) * 100));

            return (
              <div key={demand._id} className="glass-panel hover-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', padding: '0.25rem 0.75rem', borderRadius: '12px', background: urgencyStyle.bg, color: urgencyStyle.color, border: `1px solid ${urgencyStyle.border}` }}>
                      {demand.urgency}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={14} /> {demand.location}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{demand.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: '600', marginBottom: '0.75rem' }}>
                    {demand.organizationName}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                    {demand.description}
                  </p>
                </div>

                <div>
                  {/* Fulfillment Progress Bar */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Progress: <b>{demand.quantityFulfilled}</b> / {demand.quantityNeeded} {demand.unit}</span>
                      <span style={{ fontWeight: '600', color: percent === 100 ? '#4ade80' : 'var(--primary-color)' }}>{percent}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${percent}%`, height: '100%', background: percent === 100 ? '#4ade80' : 'linear-gradient(90deg, #6366f1, #a855f7)', transition: 'width 0.3s ease' }} />
                    </div>
                  </div>

                  <button
                    onClick={() => handleContribute(demand)}
                    disabled={demand.status === 'Fulfilled'}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      justify: 'center',
                      background: demand.status === 'Fulfilled' ? 'rgba(255, 255, 255, 0.1)' : undefined,
                      color: demand.status === 'Fulfilled' ? 'var(--text-muted)' : undefined,
                    }}
                  >
                    {demand.status === 'Fulfilled' ? (
                      <><CheckCircle size={16} /> Demand Fulfilled</>
                    ) : demand.category === 'Volunteer Force' ? (
                      <><Users size={16} /> Volunteer to Help</>
                    ) : (
                      <><Heart size={16} /> Contribute {demand.unit}</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Creating NGO Resource Demand */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div className="glass-panel animate-scale-in" style={{ width: '100%', maxWidth: '520px', padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Publish NGO Resource Demand</h2>
            <form onSubmit={handleCreateDemand} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>Requirement Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 500 Meal Boxes Needed for Relief Camp"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem 1rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 1rem', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  >
                    <option value="Food & Ration">Food & Ration</option>
                    <option value="Clothing & Blankets">Clothing & Blankets</option>
                    <option value="Medical Supplies">Medical Supplies</option>
                    <option value="Volunteer Force">Volunteer Force</option>
                    <option value="Education Kits">Education Kits</option>
                    <option value="Emergency Shelter">Emergency Shelter</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>Urgency</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 1rem', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  >
                    <option value="Critical Urgent">Critical Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>Quantity Needed</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.quantityNeeded}
                    onChange={(e) => setFormData({ ...formData, quantityNeeded: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 1rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>Unit (e.g. Meals, Kits)</label>
                  <input
                    type="text"
                    required
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 1rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>Location / Area</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chandni Chowk Night Shelter, New Delhi"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem 1rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>Description & Details</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Describe what help is needed and where volunteers/donors should deliver or report..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem 1rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ flex: 1, background: 'rgba(255, 255, 255, 0.05)' }}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ flex: 1 }}>
                  {submitting ? 'Publishing...' : 'Publish Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
