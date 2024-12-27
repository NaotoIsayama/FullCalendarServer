
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const API_KEY = process.env.API_KEY
const CALENDAR_ID = process.env.CALENDAR_ID;


export async function handler(event, context) {
  // CORS headers for pre-flight requests
  const headers = {
    'Access-Control-Allow-Origin': 'https://naotoisayama.github.io/', // Allow requests from your frontend
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type', // Add any headers you may need
  };

  // Allow handling pre-flight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
    };
  }

  // Main event handler (GET request)
  try {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${process.env.CALENDAR_ID}/events?key=${process.env.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers, // Add CORS headers to the response
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    return {
      statusCode: 500,
      headers, // Add CORS headers to the error response
      body: JSON.stringify({ error: 'Failed to fetch events' }),
    };
  }
};

