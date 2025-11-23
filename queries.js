require('dotenv').config();
const { Pool } = require('pg');

// Support both local development and Heroku deployment
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      }
);

pool.connect((err) => {
  if (err) {
    console.error('Database connection error', err.stack);
  } else {
    console.log('Connected to database');
  }
});

const getLinks = (req, res) => {
  pool.query('SELECT * FROM links ORDER BY id ASC', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results.rows);
  });
};

const createLink = (req, res) => {
  const { name, url } = req.body;
  if (!name || !url) {
    return res.status(400).json({ error: 'Name and URL are required.' });
  }
  pool.query('INSERT INTO links (name, url) VALUES ($1, $2) RETURNING *', [name, url], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json(results.rows[0]);
  });
};

const updateLink = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, url } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID provided.' });
  }

  pool.query(
    'UPDATE links SET name = $1, url = $2 WHERE id = $3 RETURNING *',
    [name, url, id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (results.rows.length === 0) {
        return res.status(404).json({ error: 'Link not found.' });
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

const deleteLink = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID provided.' });
  }

  pool.query('DELETE FROM links WHERE id = $1', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    // Check if any row was deleted
    if (results.rowCount === 0) {
        return res.status(404).json({ error: 'Link not found.' });
    }
    res.status(200).json({ message: 'Link deleted successfully' });
  });
};

module.exports = {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
};