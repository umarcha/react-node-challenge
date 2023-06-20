import React from "react";

export default function createNote({
  currentNote,
  handleInputChange,
  isEdit,
  addNote,
}) {
  return (
    <div className="note-form">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={currentNote.title}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        placeholder="Enter Description"
        value={currentNote.description}
        onChange={handleInputChange}
        rows="5"
        cols="25"
      ></textarea>
      <label htmlFor="status">Status:</label>
      <input
        type="text"
        id="status"
        name="status"
        value={currentNote.status}
        onChange={handleInputChange}
      />
      <button onClick={addNote} type="btn">
        {isEdit?.check ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
}
