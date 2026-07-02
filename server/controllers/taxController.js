const Tax = require('../models/Tax');

// Get current tax rate
exports.getTaxRate = async (req, res) => {
  try {
    let tax = await Tax.findOne();
    if (!tax) {
      tax = await Tax.create({ rate: 5 });
    }
    res.status(200).json({ success: true, rate: tax.rate });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update tax rate
exports.updateTaxRate = async (req, res) => {
  try {
    const { rate } = req.body;
    
    if (rate === undefined || isNaN(rate) || rate < 0 || rate > 100) {
      return res.status(400).json({ success: false, error: 'Tax rate must be a number between 0 and 100' });
    }

    let tax = await Tax.findOne();
    if (!tax) {
      tax = new Tax({ rate });
    } else {
      tax.rate = rate;
    }
    await tax.save();

    res.status(200).json({ success: true, rate: tax.rate });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
