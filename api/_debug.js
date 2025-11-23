module.exports = async (req, res) => {
  try {
    const raw = process.env.DATABASE_URL || null
    let host = null
    if (raw) {
      try {
        // Try to parse as a URL
        const u = new URL(raw)
        host = u.hostname
      } catch (e) {
        // Fallback: attempt to extract host by regex
        const m = raw.match(/@([^:/]+)(:\d+)?\//)
        if (m) host = m[1]
      }
    }

    // Mask host for safety in logs
    const maskedHost = host ? host.replace(/.(?=.{3})/g, '*') : null

    return res.status(200).json({
      env_loaded: !!raw,
      host: maskedHost,
      note: 'This endpoint reveals only a masked DB host and whether DATABASE_URL is present.'
    })
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}
