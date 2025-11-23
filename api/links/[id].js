const pool = require('../_db')

module.exports = async (req, res) => {
  try {
    const {
      query: { id },
      method,
    } = req

    const parsedId = parseInt(id, 10)
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: 'Invalid ID provided.' })
    }

    if (method === 'PUT') {
      const { name, url } = req.body
      const { rows } = await pool.query(
        'UPDATE links SET name = $1, url = $2 WHERE id = $3 RETURNING *',
        [name, url, parsedId]
      )
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Link not found.' })
      }
      return res.status(200).json(rows[0])
    }

    if (method === 'DELETE') {
      const { rowCount } = await pool.query('DELETE FROM links WHERE id = $1', [parsedId])
      if (rowCount === 0) return res.status(404).json({ error: 'Link not found.' })
      return res.status(200).json({ message: 'Link deleted successfully' })
    }

    res.setHeader('Allow', 'PUT, DELETE')
    return res.status(405).end(`Method ${method} Not Allowed`)
  } catch (error) {
    console.error('API /api/links/[id] error', error)
    return res.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}
