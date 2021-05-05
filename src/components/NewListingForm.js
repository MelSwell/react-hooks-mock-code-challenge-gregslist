import React, { useState }from 'react';

function NewListingForm({ postNewListing }) {
  const [formData, setFormData] = useState({
    description: "",
    image: "",
    location: ""
  })

  function handleFormInput(e){
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    postNewListing(formData)
    setFormData({
      description: "",
      image: "",
      location: ""
    })
  }

  return (
    <form onSubmit={handleSubmit}>
        <h1>Add Listing:</h1>
        
        <label htmlFor="description">Description: </label>
        <input 
          type="text" 
          name="description" 
          id="description" 
          placeholder="Describe your listing..."
          value={formData.description}
          onChange={handleFormInput}  
        />
        
        <label htmlFor="location">Location: </label>
        <input 
          type="text" 
          name="location" 
          id="location" 
          placeholder="Where are you located?"
          value={formData.location} 
          onChange={handleFormInput} 
        />
        
        <label htmlFor="image">Image: </label>
        <input 
          type="text" 
          name="image" 
          id="image" 
          placeholder="Image URL..."
          value={formData.image} 
          onChange={handleFormInput} 
        />
        
        <input type="Submit" />
      </form>
  )
}

export default NewListingForm;