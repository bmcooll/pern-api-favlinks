import { useState, useEffect } from 'react'
import Table from './Table'
import Form from './Form'

const LinkContainer = (props) => {
  const [links, setLinks] = useState([])

  // Fetch all links from database
  const fetchLinks = async () => {
    try {
      const response = await fetch('/links')
      const data = await response.json()
      setLinks(data)
    } catch (error) {
      console.error('Error fetching links:', error)
    }
  }

  // Create new link
  const handleSubmit = async (link) => {
    try {
      const response = await fetch('/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(link)
      })
      const newLink = await response.json()
      setLinks([...links, newLink])
    } catch (error) {
      console.error('Error creating link:', error)
    }
  }

  // Update existing link
  const handleUpdate = async (id, updatedLink) => {
    try {
      const response = await fetch(`/links/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedLink)
      })
      const updated = await response.json()
      setLinks(links.map((link) => (link.id === id ? updated : link)))
    } catch (error) {
      console.error('Error updating link:', error)
    }
  }

  // Delete link
  const handleRemove = async (id) => {
    try {
      await fetch(`/links/${id}`, {
        method: 'DELETE'
      })
      setLinks(links.filter((link) => link.id !== id))
    } catch (error) {
      console.error('Error deleting link:', error)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  return (
    <div className="container">
      <h1>My Favorite Links</h1>
      <p>Add a new url with a name and link to the table.</p>
      <Table 
        linkData={links} 
        handleRemove={handleRemove}
        handleUpdate={handleUpdate}
      />

      <br />

      <h3>Add New</h3>
      <Form handleSubmit={handleSubmit} />
    </div>
  )
}

export default LinkContainer
