import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Campaign from '../models/Campaign.js';
import Event from '../models/Event.js';
import Donation from '../models/Donation.js';
import ResourceDemand from '../models/ResourceDemand.js';

const router = express.Router();

router.all('/', async (req, res) => {
  try {
    // Clear existing collections
    await User.deleteMany({});
    await Campaign.deleteMany({});
    await Event.deleteMany({});
    await Donation.deleteMany({});
    await ResourceDemand.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // 1. Create Authentic Indian Sample Users
    const adminUser = await User.create({
      name: 'Rajesh Sharma',
      email: 'admin@sankalpindia.org',
      password: hashedPassword,
      role: 'ngo_admin',
      organizationName: 'Sankalp India Foundation',
    });

    const donorUser = await User.create({
      name: 'Ananya Sen',
      email: 'ananya.sen@gmail.com',
      password: hashedPassword,
      role: 'donor',
    });

    const volunteerUser = await User.create({
      name: 'Rohan Verma',
      email: 'rohan.v@gmail.com',
      password: hashedPassword,
      role: 'volunteer',
    });

    // 2. Create Authentic Indian Campaigns (in INR ₹)
    const campaign1 = await Campaign.create({
      title: 'Yamuna Flood Relief & Warm Food Drive',
      description: 'Providing cooked nutritious meals, clean drinking water, and emergency medical kits to 2,000+ displaced families along the Yamuna banks in Delhi.',
      category: 'Disaster Relief',
      targetAmount: 500000,
      raisedAmount: 385000,
      image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=800&auto=format&fit=crop&q=80',
      organizationName: 'Sankalp India Foundation',
      ngoId: adminUser._id,
    });

    const campaign2 = await Campaign.create({
      title: 'Roti Bank Free Meal Drive for Slum Children',
      description: 'Serving hot, hygienic daily meals to over 1,200 underprivileged street children across Dharavi and Kurla night shelters in Mumbai.',
      category: 'Healthcare',
      targetAmount: 300000,
      raisedAmount: 210000,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
      organizationName: 'Roti Bank Relief Network',
      ngoId: adminUser._id,
    });

    const campaign3 = await Campaign.create({
      title: 'Kerala Tribal School Digital Classroom & Laptops',
      description: 'Equipping rural tribal schools in Wayanad with solar-powered digital smartboards, refurbished laptops, and STEM learning tools.',
      category: 'Education',
      targetAmount: 450000,
      raisedAmount: 315000,
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80',
      organizationName: 'Akshaya Shiksha Trust',
      ngoId: adminUser._id,
    });

    // 3. Create Live NGO Resource Demands (Food, Clothing, Medical, Volunteers)
    await ResourceDemand.create({
      title: '1,000 Fresh Cooked Meal Boxes Needed Urgently',
      category: 'Food & Ration',
      quantityNeeded: 1000,
      quantityFulfilled: 650,
      unit: 'Meals',
      urgency: 'Critical Urgent',
      location: 'Chandni Chowk & Kashmere Gate Night Shelters, Delhi',
      description: 'Monsoon flooding has cut off ration supplies for night shelter residents. We need packed warm dal-chawal / roti boxes for dinner distribution.',
      organizationName: 'Sankalp India Foundation',
      ngoId: adminUser._id,
      status: 'Partially Fulfilled',
    });

    await ResourceDemand.create({
      title: '200 Winter Blankets & Warm Cloth Kits Drive',
      category: 'Clothing & Blankets',
      quantityNeeded: 200,
      quantityFulfilled: 140,
      unit: 'Kits',
      urgency: 'High',
      location: 'Old Delhi Railway Station & ISBT, New Delhi',
      description: 'Distributing thick woollen blankets and sweater kits for homeless elderly individuals sleeping in open pavement clusters.',
      organizationName: 'Goonj Relief India',
      ngoId: adminUser._id,
      status: 'Partially Fulfilled',
    });

    await ResourceDemand.create({
      title: '15 Teaching Volunteers for Weekend Science Classes',
      category: 'Volunteer Force',
      quantityNeeded: 15,
      quantityFulfilled: 8,
      unit: 'Volunteers',
      urgency: 'Medium',
      location: 'Government School Slum Cluster, Koramangala, Bengaluru',
      description: 'Looking for college students and working professionals to teach basic Mathematics, Science, and English to 5th-8th grade kids.',
      organizationName: 'Akshaya Shiksha Trust',
      ngoId: adminUser._id,
      status: 'Partially Fulfilled',
    });

    await ResourceDemand.create({
      title: '50 Emergency First Aid & Hygiene Kits',
      category: 'Medical Supplies',
      quantityNeeded: 50,
      quantityFulfilled: 20,
      unit: 'Kits',
      urgency: 'Critical Urgent',
      location: 'Flood Relief Camp, Haridwar, Uttarakhand',
      description: 'Urgent requirement for antiseptic liquids, bandages, ORS sachets, water purification tablets, and sanitary pads.',
      organizationName: 'Sankalp India Foundation',
      ngoId: adminUser._id,
      status: 'Partially Fulfilled',
    });

    // 4. Create Indian Volunteer Events
    await Event.create({
      title: 'Yamuna Riverbank Clean-up & Tree Plantation',
      description: 'Join 50+ volunteers to clear plastic waste and plant 300 native peepal and neem saplings along the Yamuna Ghats.',
      location: 'ITO Yamuna Ghat, New Delhi',
      date: '2026-08-20',
      capacity: 60,
      organizationName: 'Sankalp India Foundation',
      registeredVolunteers: [volunteerUser._id],
      ngoId: adminUser._id,
    });

    await Event.create({
      title: 'Mumbai Coastal Marine Cleanup & Turtle Awareness',
      description: 'Sunday morning volunteer drive to remove non-biodegradable waste from Juhu beach shorelines and raise awareness among visitors.',
      location: 'Juhu Beach North End, Mumbai',
      date: '2026-08-25',
      capacity: 40,
      organizationName: 'Clean Ocean India Initiative',
      registeredVolunteers: [],
      ngoId: adminUser._id,
    });

    // 5. Create Sample Donation
    await Donation.create({
      campaignId: campaign1._id,
      donorId: donorUser._id,
      donorName: donorUser.name,
      amount: 5000,
      paymentMethod: 'UPI / Paytm',
      status: 'completed',
    });

    res.json({
      success: true,
      message: 'Database seeded successfully with authentic Indian campaigns, NGO resource demands, and volunteer events!',
      data: {
        campaignsCount: 3,
        demandsCount: 4,
        eventsCount: 2,
        usersCount: 3,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
