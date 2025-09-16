const express = require('express');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const upload = multer({ dest: 'uploads/' });

const pool = new Pool({
  user: 'youruser',
  host: 'localhost',
  database: 'contentorgans',
  password: 'yourpassword',
  port: 5432,
});

// Add database connection test and error logging
pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => {
    console.error('Database connection error:', err.stack);
    process.exit(1);
  });

app.use(cors());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.post('/api/service-request', upload.single('media'), async (req, res) => {
  const { serial, userType, problemArea, description, email } = req.body;
  const media = req.file ? req.file.filename : null;
  try {
    await pool.query(
      'INSERT INTO service_requests (serial, user_type, problem_area, description, media, email) VALUES ($1, $2, $3, $4, $5, $6)',
      [serial, userType, problemArea, description, media, email]
    );
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));