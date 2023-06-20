import moment from 'moment'
import React from 'react'

export default function index({notes,editNote,deleteNote}) {
  return (
    <>
    {notes?.map((note, index) => (
      <li key={index} className="note-item">
        <h4>{note.title}</h4>
        <p>{note.description}</p>
        <p>
          Created: {moment(note.createdDate).format("DD-MM-YYYY")}
        </p>
        <p>
          Updated: {moment(note.updatedDate).format("DD-MM-YYYY")}
        </p>
        <p>Id: {note.id}</p>
        <p>Status: {note.status}</p>
        <div className="note-actions">
          <button onClick={() => editNote(index)} type="btn">
            Edit
          </button>
          <button onClick={() => deleteNote(index)} type="btn">
            Delete
          </button>
        </div>
      </li>
    ))}
  </>
  )
}
