import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    donorName: {
      type: String,
      default: 'Anonymous Donor',
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: 'Credit Card / UPI',
    },
    status: {
      type: String,
      enum: ['completed', 'pending'],
      default: 'completed',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Donation', donationSchema);
