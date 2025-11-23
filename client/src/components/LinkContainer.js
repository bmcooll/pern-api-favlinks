import { useState, useEffect } from 'react'
import Table from './Table'
import Form from './Form'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const LinkContainer = (props) => {
  const [links, setLinks] = useState([])

  // Fetch all links from Supabase
  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        console.error('Error fetching links:', error)
        return
      }
      setLinks(data || [])
    } catch (error) {
      console.error('Unexpected error fetching links:', error)
    }
  }

  // Create new link
  const handleSubmit = async (link) => {
    try {
      const { data, error } = await supabase
        .from('links')
        .insert([{ name: link.name, url: link.url }])
        .select()
        .single()

      if (error) {
        console.error('Error creating link:', error)
        return
      }
      setLinks([...links, data])
    } catch (error) {
      console.error('Unexpected error creating link:', error)
    }
  }

  // Update existing link
  const handleUpdate = async (id, updatedLink) => {
    try {
      const { data, error } = await supabase
        .from('links')
        .update({ name: updatedLink.name, url: updatedLink.url })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating link:', error)
        return
      }
      setLinks(links.map((link) => (link.id === id ? data : link)))
    } catch (error) {
      console.error('Unexpected error updating link:', error)
    }
  }

  // Delete link
  const handleRemove = async (id) => {
    try {
      const { error } = await supabase.from('links').delete().eq('id', id)
      if (error) {
        console.error('Error deleting link:', error)
        return
      }
      setLinks(links.filter((link) => link.id !== id))
    } catch (error) {
      console.error('Unexpected error deleting link:', error)
    }
  }

  useEffect(() => {
    fetchLinks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
