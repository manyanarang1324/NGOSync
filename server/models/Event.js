import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    date: {
      type: String,
      required: [true, 'Event date is required'],
    },
    capacity: {
      type: Number,
      default: 20,
    },
    organizationName: {
      type: String,
      required: true,
    },
    registeredVolunteers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
