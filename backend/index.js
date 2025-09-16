const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // For serving React frontend
require('dotenv').config();

// ------------------------------
// EXPRESS APP SETUP
// ------------------------------
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ------------------------------
// ROUTES: Custom Backend Functionality
// ------------------------------
const sendQuestionRoute = require('./routes/sendQuestion');
if (sendQuestionRoute && sendQuestionRoute.stack) {
  // Only mount if it's a valid router
  app.use('/api', sendQuestionRoute);
} else {
  console.warn('Warning: sendQuestionRoute is not a valid Express router');
}

// ------------------------------
// MONGODB CONNECTION
// ------------------------------
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ------------------------------
// EVENT SCHEMA & CRUD ROUTES
// ------------------------------
const eventSchema = new mongoose.Schema({
  date: String,        // YYYY-MM-DD
  description: String,
});

const Event = mongoose.model('Event', eventSchema);

// Get events for a month (query param ?month=YYYY-MM)
app.get('/events', async (req, res) => {
  const { month } = req.query;
  if (!month) return res.status(400).json({ message: 'Month query parameter is required (YYYY-MM)' });

  try {
    const events = await Event.find({ date: { $regex: `^${month}` } });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new event
app.post('/events', async (req, res) => {
  const { date, description } = req.body;
  if (!date || !description) return res.status(400).json({ message: 'Date and description are required' });

  try {
    const newEvent = new Event({ date, description });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete event by ID
app.delete('/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Event.findByIdAndDelete(id);
    if (deleted) res.json({ message: 'Event deleted' });
    else res.status(404).json({ message: 'Event not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------------------------------
// SERVE REACT FRONTEND
// ------------------------------
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// Only serve React index.html for routes not starting with /api
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// ------------------------------
// START SERVER
// ------------------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});