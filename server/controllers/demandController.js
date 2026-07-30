import ResourceDemand from '../models/ResourceDemand.js';

export const getDemands = async (req, res) => {
  try {
    const { category, urgency } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (urgency) filter.urgency = urgency;

    const demands = await ResourceDemand.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: demands.length, data: demands });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createDemand = async (req, res) => {
  try {
    if (req.user.role !== 'ngo_admin') {
      return res.status(403).json({ success: false, message: 'Only NGO Admins can publish resource demands.' });
    }

    const { title, category, quantityNeeded, unit, urgency, location, description } = req.body;
    const demand = await ResourceDemand.create({
      title,
      category,
      quantityNeeded: Number(quantityNeeded),
      unit: unit || 'Items',
      urgency: urgency || 'High',
      location,
      description,
      organizationName: req.user.organizationName || req.user.name,
      ngoId: req.user._id,
    });

    res.status(201).json({ success: true, data: demand });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const contributeDemand = async (req, res) => {
  try {
    const { id } = req.params;
    const { amountContributed } = req.body;
    const demand = await ResourceDemand.findById(id);

    if (!demand) {
      return res.status(404).json({ success: false, message: 'Resource demand not found' });
    }

    const added = Number(amountContributed) || 1;
    demand.quantityFulfilled += added;

    if (demand.quantityFulfilled >= demand.quantityNeeded) {
      demand.status = 'Fulfilled';
    } else if (demand.quantityFulfilled > 0) {
      demand.status = 'Partially Fulfilled';
    }

    await demand.save();
    res.json({ success: true, message: `Successfully contributed ${added} ${demand.unit}!`, data: demand });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
