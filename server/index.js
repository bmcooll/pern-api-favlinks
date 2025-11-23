const express = require('express')
const cors = require('cors')
const path = require('path')

const db = require('../queries')

const app = express()


//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



//host react app as static files
app.use(express.static(path.resolve(__dirname, '../client/build')))

// port - use environment variable for deployment or 3000 for local
const port = process.env.PORT || 3000

// routes
app.get('/', (req, res) => {
    // we'll do some stuff here
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})


app.get('/links', db.getLinks)
app.post('/new', db.createLink)
app.put('/links/:id', db.updateLink)
app.delete('/links/:id', db.deleteLink)

// starting expresss on our port
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

// Export for Vercel serverless
module.exports = app

