const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const pool = new Pool({
  user: 'your_pg_user',
  host: 'localhost',
  database: 'your_db',
  password: 'your_password',
  port: 5432,
});
app.use(cors());
app.use(express.json());

// Newsletter subscription endpoint
app.post('/api/newsletter', async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    await pool.query(
      'INSERT INTO newsletter_subscribers (name, email, phone) VALUES ($1, $2, $3)',
      [name, email, phone]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));