import { useEffect, useState } from "react";
import { getAllListings } from "../services/listings.service";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import ListingCard from "../components/ListingCard";
import { Link } from "react-router-dom";
import { addFavorite } from "../services/favorites.service";
import "../css/Mylistings.css";

function Listings() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [favoriteMessage, setFavoriteMessage] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getAllListings();
        setListings(response.data);
      } catch (error) {
        setErrorMessage("Failed to load listings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleAddFavorite = async (listingId) => {
    try {
      await addFavorite(listingId);

      setFavoriteMessage(listingId);

      setTimeout(() => {
        setFavoriteMessage(null);
      }, 2500);
    } catch (error) {
      console.log(error);
      alert("Failed to add listing to favorites.");
    }
  };

  if (isLoading) return <Spinner />;
  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  return (
    <div className="listings-page">
      <h1>All Listings</h1>

      <div className="listings-grid">
        {listings.map((listing) => {
          return (
            <div key={listing._id}>
              <ListingCard
                listing={listing}
                onFavoriteClick={handleAddFavorite}
                favoriteIcon="♡"
              />

              {favoriteMessage === listing._id && (
                <p className="favorite-success">Added to favorites ❤️</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Listings;
