import Campaign from '../models/Campaign.js';

// Get all campaigns
export const getCampaigns = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const campaigns = await Campaign.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: campaigns.length, data: campaigns });
  } catch (error) {
    next(error);
  }
};

// Get single campaign by ID
export const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      res.status(404);
      throw new Error('Campaign not found');
    }
    res.json({ success: true, data: campaign });
  } catch (error) {
    next(error);
  }
};

// Create a new campaign (NGO Admin only)
export const createCampaign = async (req, res, next) => {
  try {
    const { title, description, category, targetAmount, image, organizationName } = req.body;

    const campaign = await Campaign.create({
      title,
      description,
      category,
      targetAmount,
      image: image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
      organizationName: organizationName || req.user.organizationName || req.user.name,
      ngoId: req.user._id,
    });

    res.status(201).json({ success: true, data: campaign });
  } catch (error) {
    next(error);
  }
};
