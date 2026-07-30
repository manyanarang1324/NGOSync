import mongoose from 'mongoose';

const resourceDemandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Demand title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Food & Ration', 'Clothing & Blankets', 'Medical Supplies', 'Education Kits', 'Volunteer Force', 'Emergency Shelter'],
      default: 'Food & Ration',
    },
    quantityNeeded: {
      type: Number,
      required: [true, 'Quantity needed is required'],
      min: 1,
    },
    quantityFulfilled: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: 'Kits',
    },
    urgency: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical Urgent'],
      default: 'High',
    },
    location: {
      type: String,
      required: true,
      default: 'New Delhi, India',
    },
    description: {
      type: String,
      required: true,
    },
    organizationName: {
      type: String,
      required: true,
    },
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Open', 'Partially Fulfilled', 'Fulfilled'],
      default: 'Open',
    },
  },
  {
    timestamps: true,
  }
);

const ResourceDemand = mongoose.model('ResourceDemand', resourceDemandSchema);
export default ResourceDemand;
