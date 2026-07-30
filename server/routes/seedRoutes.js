import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Campaign from '../models/Campaign.js';
import Event from '../models/Event.js';
import Donation from '../models/Donation.js';

const router = express.Router();

router.all('/', async (req, res) => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Campaign.deleteMany({});
    await Event.deleteMany({});
    await Donation.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create Sample Users
    const adminUser = await User.create({
      name: 'Elena Rostova',
      email: 'admin@greenearth.org',
      password: hashedPassword,
      role: 'ngo_admin',
      organizationName: 'Green Earth Foundation',
    });

    const donorUser = await User.create({
      name: 'Alex Mercer',
      email: 'alex@example.com',
      password: hashedPassword,
      role: 'donor',
    });

    const volunteerUser = await User.create({
      name: 'Sarah Connor',
      email: 'sarah@example.com',
      password: hashedPassword,
      role: 'volunteer',
    });

    // Create Sample Campaigns
    const campaign1 = await Campaign.create({
      title: 'Clean Water & Sanitation Drive 2026',
      description: 'Providing sustainable solar-powered water filtration systems to rural schools and villages across East Africa.',
      category: 'Healthcare',
      targetAmount: 50000,
      raisedAmount: 34200,
      image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=800&auto=format&fit=crop&q=80',
      organizationName: 'Green Earth Foundation',
      ngoId: adminUser._id,
    });

    const campaign2 = await Campaign.create({
      title: 'Digital Literacy for Underprivileged Youth',
      description: 'Equipping community learning centers with refurbished laptops, internet connectivity, and coding workshops.',
      category: 'Education',
      targetAmount: 30000,
      raisedAmount: 18500,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
      organizationName: 'EduTech Relief',
      ngoId: adminUser._id,
    });

    const campaign3 = await Campaign.create({
      title: 'Emergency Flood Relief & Shelter Kits',
      description: 'Rapid response distribution of food supplies, emergency blankets, and medical kits to affected families.',
      category: 'Disaster Relief',
      targetAmount: 75000,
      raisedAmount: 62000,
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80',
      organizationName: 'Global Humanitarian Response',
      ngoId: adminUser._id,
    });

    // Create Sample Events
    await Event.create({
      title: 'Coastal Beach Clean-up & Mangrove Planting',
      description: 'Join volunteers this weekend to clean up marine debris and plant 500 mangrove saplings along the shoreline.',
      location: 'Ocean Bay Reserve, Sector 4',
      date: '2026-08-15',
      capacity: 50,
      organizationName: 'Green Earth Foundation',
      registeredVolunteers: [volunteerUser._id],
      ngoId: adminUser._id,
    });

    await Event.create({
      title: 'Community Food Drive & Meal Distribution',
      description: 'Help pack and distribute 1,000 warm meals to local community shelters and elderly care homes.',
      location: 'Downtown Hope Center',
      date: '2026-08-20',
      capacity: 30,
      organizationName: 'Hope Kitchen NGO',
      registeredVolunteers: [],
      ngoId: adminUser._id,
    });

    // Create Sample Donations
    await Donation.create({
      campaignId: campaign1._id,
      donorId: donorUser._id,
      donorName: donorUser.name,
      amount: 500,
      paymentMethod: 'Credit Card',
      status: 'completed',
    });

    res.json({
      success: true,
      message: 'Database seeded successfully with sample campaigns, volunteer events, and users!',
      data: {
        campaignsCount: 3,
        eventsCount: 2,
        usersCount: 3,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
