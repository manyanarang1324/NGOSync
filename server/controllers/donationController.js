import Donation from '../models/Donation.js';
import Campaign from '../models/Campaign.js';

// Create a new donation
export const createDonation = async (req, res, next) => {
  try {
    const { campaignId, amount, paymentMethod } = req.body;

    if (!campaignId || !amount || amount <= 0) {
      res.status(400);
      throw new Error('Valid campaign and donation amount are required');
    }

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      res.status(404);
      throw new Error('Campaign not found');
    }

    // Record Donation
    const donation = await Donation.create({
      campaignId,
      donorId: req.user?._id,
      donorName: req.user?.name || 'Anonymous Donor',
      amount: Number(amount),
      paymentMethod: paymentMethod || 'Credit Card / UPI',
      status: 'completed',
    });

    // Update Campaign Raised Amount
    campaign.raisedAmount += Number(amount);
    if (campaign.raisedAmount >= campaign.targetAmount) {
      campaign.status = 'completed';
    }
    await campaign.save();

    res.status(201).json({
      success: true,
      message: 'Donation processed successfully',
      data: donation,
      updatedCampaign: campaign,
    });
  } catch (error) {
    next(error);
  }
};

// Get user donations
export const getUserDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ donorId: req.user._id })
      .populate('campaignId', 'title category organizationName')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: donations });
  } catch (error) {
    next(error);
  }
};
