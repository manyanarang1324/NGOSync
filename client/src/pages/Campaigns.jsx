import React, { useState, useEffect } from 'react';
import { fetchCampaigns, processDonation } from '../services/api';
import { Megaphone, Search, Heart, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState(50);
  const [donating, setDonating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = ['All', 'Education', 'Healthcare', 'Disaster Relief', 'Environment', 'Community'];

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const res = await fetchCampaigns({ category: selectedCategory, search: searchTerm });
      if (res.success) {
        setCampaigns(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, [selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadCampaigns();
  };

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to make a donation.');
      navigate('/login');
      return;
    }

    try {
      setDonating(true);
      setMessage({ type: '', text: '' });
      const res = await processDonation({
        campaignId: selectedCampaign._id,
        amount: donationAmount,
      });

      if (res.success) {
        setMessage({ type: 'success', text: `Thank you! Your donation of $${donationAmount} was received.` });
        setTimeout(() => {
          setSelectedCampaign(null);
          loadCampaigns();
        }, 1500);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Donation failed.' });
    } finally {
      setDonating(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Megaphone color="#6366f1" size={28} />
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800' }}>Active Campaigns</h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Explore verified NGO initiatives and contribute directly to high-impact causes worldwide.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              color: '#fff',
              outline: 'none'
            }}
          />
          <button type="submit" className="btn btn-secondary" style={{ padding: '0.5rem 0.8rem' }}>
            <Search size={16} />
          </button>
        </form>
      </div>

      {/* Campaign Cards Grid */}
      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>No campaigns found matching your criteria.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {campaigns.map((camp) => {
            const percent = Math.min(100, Math.round((camp.raisedAmount / camp.targetAmount) * 100));
            return (
              <div key={camp._id} className="glass-panel" style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <img
                  src={camp.image}
                  alt={camp.title}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {camp.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      {camp.organizationName}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>{camp.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', flex: 1 }}>
                    {camp.description}
                  </p>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      <span style={{ color: '#10b981', fontWeight: '600' }}>${camp.raisedAmount.toLocaleString()} raised</span>
                      <span style={{ color: 'var(--text-dim)' }}>Goal: ${camp.targetAmount.toLocaleString()}</span>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.1)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${percent}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCampaign(camp)}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Heart size={16} /> Support Campaign
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Donation Modal */}
      {selectedCampaign && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '460px',
            width: '100%',
            padding: '2rem',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedCampaign(null)}
              style={{
                position: 'absolute',
                top: '1rem', right: '1rem',
                background: 'none', border: 'none', color: '#fff', cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Support Cause</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {selectedCampaign.title}
            </p>

            {message.text && (
              <div style={{
                padding: '0.75rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                background: message.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: message.type === 'success' ? '#10b981' : '#f87171'
              }}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleDonateSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                  Donation Amount ($ USD)
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {[25, 50, 100, 250].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setDonationAmount(amt)}
                      className={`btn ${donationAmount === amt ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, padding: '0.4rem', fontSize: '0.85rem' }}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={donating}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {donating ? 'Processing...' : `Confirm $${donationAmount} Contribution`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
