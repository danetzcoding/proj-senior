// IMPORTS
// ------------------------------
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

// ------------------------------
// CORS CONFIGURATION
// ------------------------------
const allowedOrigins = [
  'http://localhost:5173', // Vite dev server default
  'https://my-frontend.onrender.com' // replace with your Render frontend URL
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

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

// Get events for a month
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
// SUBMIT QUESTION ENDPOINT
// ------------------------------
app.post('/api/submit', async (req, res) => {
  const { question, email } = req.body;
  if (!question || !email) return res.status(400).json({ message: 'Question and email are required' });

  try {
    console.log('Question received:', question, 'from', email);
    res.status(200).json({ message: 'Question submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // ------------------------------
// // SERVE REACT FRONTEND
// // ------------------------------
// const buildPath = path.join(__dirname, 'build');
// app.use(express.static(buildPath));

// // Only serve React index.html for routes not starting with /api
// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(buildPath, 'index.html'));
// });

// ------------------------------
// START SERVER
// ------------------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});