const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const nodemailer = require('nodemailer'); // Optional for admin alerts

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Fake data (replace with DB query)
let tutorials = [
  { title: 'Fix npm errors', content: 'Try deleting node_modules and reinstalling.' },
  { title: 'React not rendering', content: 'Check if the component is imported correctly.' }
];

app.get('/api/search', (req, res) => {
  const q = req.query.q.toLowerCase();
  const results = tutorials.filter(item =>
    item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q)
  );
  res.json(results);
});

app.post('/api/questions', (req, res) => {
  const { question } = req.body;
  console.log('New question received:', question);

  // Optional: Send email to admin here using nodemailer
  res.status(200).send('Received');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});