import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getListingById, addToFavorites } from "../services/listings.service";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import ListingCard from "../components/ListingCard"; //no se usa?
import service from "../services/api";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../services/favorites.service";
import Listings from "./Listings";
import { startConversation } from "../services/conversations.service";
import { AuthContext } from "../context/auth.context";

function ListingDetails() {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getListingById(listingId);
        setListing(response.data);
      } catch (error) {
        setErrorMessage("Failed to load listing details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleAddFavorite = async (listingId) => {
    try {
      await addFavorite(listingId);
      alert("Listing added to favorites!");
    } catch (error) {
      console.log(error);
      alert("Failed to add listing to favorites.");
    }
  };

  const handleContactOwner = async () => {
    try {
      if (!user) {
        alert("You need to log in first.");
        return;
      }

      const ownerId = listing.owner._id;

     /* if (ownerId.toString() === user._id.toString()) {
        alert("You cannot message your own listing.");
        return;
      }*/

      const response = await startConversation(listing._id, ownerId);

      navigate(`/conversations/${response.data._id}`);
    } catch (error) {
      console.log("Error starting conversation:", error);
      alert("Failed to start conversation.");
    }
  };

  if (isLoading) return <Spinner />;
  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  return (
    <div>
      <h1>{listing.title}</h1>
      <p>{listing.city}</p>
      <p>Price: ${listing.price}</p>
      <p>Cleanliness: {listing.cleanliness}</p>
      <p>Noise level: {listing.noiseLevel}</p>

      <p>Pet friendly: {listing.petsAllowed ? "Yes" : "No"}</p>
      <p>Smoking allowed: {listing.smokerAllowed ? "Yes" : "No"}</p>

      <img src={listing.photoUrl} alt={listing.title} />

      <button onClick={() => handleAddFavorite(listing._id)}>
        Add to Favorites
      </button>

      <button onClick={handleContactOwner}>Contact</button>

      <p>Owner: {listing.owner?.name}</p>

      <p>{listing.description}</p>
    </div>
  );
}

export default ListingDetails;
