import { useState } from 'react'

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Actions</th>
      </tr>
    </thead>
  )
}

const TableBody = (props) => {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', url: '' })

  const handleEditClick = (link) => {
    setEditingId(link.id)
    setEditForm({ name: link.name, url: link.url })
  }

  const handleEditChange = (event) => {
    const { name, value } = event.target
    setEditForm({ ...editForm, [name]: value })
  }

  const handleSaveClick = (id) => {
    props.handleUpdate(id, editForm)
    setEditingId(null)
  }

  const handleCancelClick = () => {
    setEditingId(null)
  }

  const rows = props.linkData.map((link, index) => {
    return (
      <tr key={link.id}>
        {editingId === link.id ? (
          <>
            <td>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="url"
                value={editForm.url}
                onChange={handleEditChange}
              />
            </td>
            <td>
              <button onClick={() => handleSaveClick(link.id)}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </td>
          </>
        ) : (
          <>
            <td>{link.name}</td>
            <td>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.url}
              </a>
            </td>
            <td>
              <button onClick={() => handleEditClick(link)}>Edit</button>
              <button onClick={() => props.handleRemove(link.id)}>Delete</button>
            </td>
          </>
        )}
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}

const Table = (props) => {
  return (
    <table>
      <TableHeader />
      <TableBody 
        linkData={props.linkData} 
        handleRemove={props.handleRemove}
        handleUpdate={props.handleUpdate}
      />
    </table>
  )
}

export default Table
