const pool = require('../_db')

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const { rows } = await pool.query('SELECT * FROM links ORDER BY id ASC')
      return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
      const { name, url } = req.body
      if (!name || !url) {
        return res.status(400).json({ error: 'Name and URL are required.' })
      }
      const { rows } = await pool.query(
        'INSERT INTO links (name, url) VALUES ($1, $2) RETURNING *',
        [name, url]
      )
      return res.status(201).json(rows[0])
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (error) {
    console.error('API /api/links error', error)
    return res.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}
