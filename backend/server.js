require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not defined

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Configure CORS to allow requests from the React Native app
app.use(
  cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  })
);

// Database connection configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // Default port for PostgreSQL
});

// Handle preflight requests
app.options('*', cors());

// Sign-in route
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userResult = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (userResult.rowCount === 0) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Sign-in successful
    res.status(200).json({ message: 'Sign-in successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sign-up route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userCheck.rowCount > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Insert new user into the database
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, password]
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
