import { useEffect, useState } from "react";
import { removeFavorite, getFavorites } from "../services/favorites.service";
import ListingCard from "../components/ListingCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import "../Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchFavorites = async () => {
    try {
      const response = await getFavorites();
      setFavorites(response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to load favorites.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (listingId) => {
    try {
      await removeFavorite(listingId);
      setFavorites((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error);
      alert("Failed to remove favorite.");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (isLoading) return <Spinner />;
  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  return (
    <div className="favorites-page">
      <h1>Favorites</h1>

      {favorites.length === 0 ? (
        <p className="favorites-empty">No favorites yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              onFavoriteClick={handleRemoveFavorite}
              favoriteIcon="✕"
              extraLabel="Saved listing"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;