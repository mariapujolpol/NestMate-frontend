import React from "react";  
import { removeFavorite, getFavorites } from "../services/favorites.service";
import { useEffect, useState } from "react";

function Favorites() {

  const [favorites, setFavorites] = useState([]);
  const [deleteFavorites, setDeleteFavorites] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await getFavorites();
      setFavorites(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Failed to load favorites.");
    }
  };

  const handleRemoveFavorite = async (listingId) => {
    try {
      await removeFavorite(listingId);
      fetchFavorites();
    } catch (error) {
      console.log("Failed to remove favorite.");
      alert("Failed to remove favorite.");
    }
  };


  useEffect(() => {
    fetchFavorites();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (favorites.length === 0) return <p>No favorites yet.</p>;

  return (
    <div>
      <h1>Favorites</h1>

      {favorites.map((listing) => (
        <div key={listing._id || listing.id}>
          <img src={listing.photoUrl} alt={listing.title} />
          <h3>{listing.title}</h3>
          <p>{listing.city}</p>
          <p>{listing.price}</p>

          <button onClick={() => handleRemoveFavorite(listing._id)}>
            Remove from Favorites
          </button>
        </div>
      ))}
    </div>
  );

}

export default Favorites;