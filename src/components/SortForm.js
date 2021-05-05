import React from 'react';

function SortForm({ setSortMethod }) {
  return (
    <>
      <label>Sort:</label><br/>
        <select onChange={(e) => setSortMethod(e.target.value)}>
          <option value="none">None</option>
          <option value="location">Sort By Location</option>
        </select>
    </>
  )
}

export default SortForm; 