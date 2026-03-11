import React, { useEffect, useState } from "react";
import { getMyListings, deleteListing } from "../services/listings.service";
import { Link } from "react-router-dom";
import "../css/MyListings.css";

function MyListings() {
  const [myListings, setMyListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const response = await getMyListings();
      setMyListings(response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error loading your listings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (listingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteListing(listingId);

      setMyListings((prevListings) =>
        prevListings.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error);
      setErrorMessage("Error deleting listing");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div className="my-listings-page">
      <h2>My Listings</h2>

      {myListings.length === 0 ? (
        <p>You have no listings yet.</p>
      ) : (
        <div className="my-listings-grid">
          {myListings.map((listing) => {
            return (
              <article key={listing._id} className="my-listing-card">
                {listing.photoUrl && (
                  <img
                    src={listing.photoUrl}
                    alt={listing.title}
                    className="my-listing-image"
                  />
                )}

                <h3>{listing.title}</h3>
                <p>{listing.city}</p>
                <p>€{listing.price}</p>

                <div className="my-listing-actions">
                  <Link to={`/listings/${listing._id}`}>View details</Link>

                  <Link to={`/listings/${listing._id}/edit`}>Edit</Link>

                  <button onClick={() => handleDelete(listing._id)}>
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyListings;