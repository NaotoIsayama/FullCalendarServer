const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const corsOptions = {
  origin: "https://NaotoIsauama.github.io",
  methods: 'GET',
  credentials: true,
}

dotenv.config();

const API_KEY = process.env.API_KEY
const CALENDAR_ID = process.env.CALENDAR_ID;

const app = express();
const PORT = 3000;

app.use(cors(corsOptions));

// GET request handler
app.get('/events', async (req, res) => {
    try {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${process.env.CALENDAR_ID}/events?key=${process.env.GOOGLE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).send('Server error');
    }
  });

  app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
  });