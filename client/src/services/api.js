import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 
  (window.location.hostname === 'localhost' ? '/api' : 'https://ngosync-api.onrender.com/api');

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('ngosync_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const checkHealth = async () => {
  const response = await API.get('/health');
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};

export const fetchCampaigns = async (params = {}) => {
  const response = await API.get('/campaigns', { params });
  return response.data;
};

export const createCampaign = async (campaignData) => {
  const response = await API.post('/campaigns', campaignData);
  return response.data;
};

export const processDonation = async (donationData) => {
  const response = await API.post('/donations', donationData);
  return response.data;
};

export const fetchMyDonations = async () => {
  const response = await API.get('/donations/my-donations');
  return response.data;
};

export const fetchEvents = async () => {
  const response = await API.get('/events');
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await API.post('/events', eventData);
  return response.data;
};

export const applyForEvent = async (eventId) => {
  const response = await API.post(`/events/${eventId}/apply`);
  return response.data;
};

export const fetchDemands = async (params = {}) => {
  const response = await API.get('/demands', { params });
  return response.data;
};

export const createDemand = async (demandData) => {
  const response = await API.post('/demands', demandData);
  return response.data;
};

export const contributeDemand = async (id, amountContributed = 1) => {
  const response = await API.post(`/demands/${id}/contribute`, { amountContributed });
  return response.data;
};

export default API;
