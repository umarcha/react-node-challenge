import React from 'react'

export default function searchBox({FilterNotes}) {
  return (
    <div className="search-container">
            <label htmlFor="search">Search by Title:</label>
            <input
              type="text"
              id="search"
              placeholder="Enter Title"
              onChange={(e) => {
                FilterNotes(e.target.value);
              }}
            />
          </div>
  )
}
