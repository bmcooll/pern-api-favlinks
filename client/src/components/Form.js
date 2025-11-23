import { useState } from 'react'

const Form = (props) => {
  const initialFormState = { name: '', url: '' }
  const [link, setLink] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setLink({ ...link, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!link.name || !link.url) return

    props.handleSubmit(link)
    setLink(initialFormState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={link.name}
        onChange={handleInputChange}
        placeholder="Enter link name"
      />
      <label>URL</label>
      <input
        type="text"
        name="url"
        value={link.url}
        onChange={handleInputChange}
        placeholder="Enter URL"
      />
      <button type="submit">Add Link</button>
    </form>
  )
}

export default Form
