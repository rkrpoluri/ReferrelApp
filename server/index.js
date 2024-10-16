const express = require('express');
const app = express();
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Simulated data for Districts, Mandals, and Villages
const data = {
  District1: {
    Mandal1: ["Village1", "Village2"],
    Mandal2: ["Village3", "Village4"],
  },
  District2: {
    Mandal3: ["Village5", "Village6"],
    Mandal4: ["Village7", "Village8"],
  },
};

// API to fetch Mandals based on District
app.get('/mandals/:district', (req, res) => {
  const district = req.params.district;
  if (data[district]) {
    res.json(Object.keys(data[district]));
  } else {
    res.status(404).json({ error: 'District not found' });
  }
});

// API to fetch Villages based on Mandal
app.get('/villages/:district/:mandal', (req, res) => {
  const { district, mandal } = req.params;
  if (data[district] && data[district][mandal]) {
    res.json(data[district][mandal]);
  } else {
    res.status(404).json({ error: 'Mandal not found in this district' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
