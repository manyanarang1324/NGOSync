import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Campaign title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      enum: ['Education', 'Healthcare', 'Disaster Relief', 'Environment', 'Community'],
      default: 'Community',
    },
    targetAmount: {
      type: Number,
      required: [true, 'Target amount is required'],
    },
    raisedAmount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
    },
    organizationName: {
      type: String,
      required: true,
    },
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Campaign', campaignSchema);
