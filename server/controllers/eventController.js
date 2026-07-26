import Event from '../models/Event.js';

export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ success: true, count: events.length, data: events });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const { title, description, location, date, capacity, organizationName } = req.body;

    const event = await Event.create({
      title,
      description,
      location,
      date,
      capacity: capacity || 20,
      organizationName: organizationName || req.user.organizationName || req.user.name,
      ngoId: req.user._id,
    });

    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

export const applyForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }

    if (event.registeredVolunteers.includes(req.user._id)) {
      return res.status(400).json({ success: false, message: 'You have already registered for this event' });
    }

    if (event.registeredVolunteers.length >= event.capacity) {
      return res.status(400).json({ success: false, message: 'Event is at maximum volunteer capacity' });
    }

    event.registeredVolunteers.push(req.user._id);
    await event.save();

    res.json({ success: true, message: 'Registered as volunteer successfully', data: event });
  } catch (error) {
    next(error);
  }
};
