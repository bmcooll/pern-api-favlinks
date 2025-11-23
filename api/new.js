const linksHandler = require('./links/index')

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    return linksHandler(req, res)
  }
  res.setHeader('Allow', 'POST')
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
