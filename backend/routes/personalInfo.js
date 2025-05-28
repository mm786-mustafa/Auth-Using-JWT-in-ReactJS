const express = require('express');
const PersonalInfo = require('../models/PersonalInfo');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const list = await PersonalInfo.find({ user: req.user._id });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const pi = new PersonalInfo({ ...req.body, user: req.user._id });
    await pi.save();
    res.status(201).json(pi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const pi = await PersonalInfo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!pi) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(pi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pi = await PersonalInfo.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!pi) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
