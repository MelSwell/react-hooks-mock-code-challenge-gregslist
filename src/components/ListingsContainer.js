import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import SortForm from './SortForm';
import NewListingForm from './NewListingForm'

function ListingsContainer({ searchTerm }) {
  const [listings, setListings] = useState([])
  const [sortMethod, setSortMethod] = useState("none")

  useEffect(() => {
    fetch('http://localhost:6001/listings')
    .then(resp => resp.json())
    .then(data => setListings(filterListingsBySearchTerm(data)))
  }, [searchTerm])

  function filterListingsBySearchTerm(data) {
    return data.filter((listing) => {
      if (searchTerm === "") return true

      return listing.description.toUpperCase().includes(searchTerm.toUpperCase())
    })
  }
  
  function handleDeleteClick(id) {
    fetch(`http://localhost:6001/listings/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setListings((prevListings) => prevListings.filter((listing) => {
        return listing.id !== id
      }))
    })
  }

  function postNewListing(data) {
    fetch('http://localhost:6001/listings', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then((newListing) => setListings((prevListings) => [...prevListings, newListing]))
  }

  let sortedListings;
  if (sortMethod === "location"){
    sortedListings = [...listings].sort((listing_a, listing_b) => {
      return listing_a.location.toUpperCase().localeCompare(listing_b.location.toUpperCase())
    })
  }
  else {
    sortedListings = [...listings]
  }

  const listingCards = sortedListings.map((l) => {
    return (
      <ListingCard 
        key={l.id}
        id={l.id}
        description={l.description}
        image={l.image}
        location={l.location}
        handleDeleteClick={handleDeleteClick}
      />
    )
  })


  return (
    <main>
      <NewListingForm postNewListing={postNewListing}/>
      <br/>
      <SortForm setSortMethod={setSortMethod} />
      <ul className="cards">
        {listingCards}
      </ul>
    </main>
  );
}

export default ListingsContainer;
