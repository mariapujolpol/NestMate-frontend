import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getListingById, deleteListing } from "../services/listings.service";
import { addFavorite } from "../services/favorites.service";
import { startConversation } from "../services/conversations.service";
import { AuthContext } from "../context/auth.context";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import "../css/ListingDetails.css";

function ListingDetails() {
  const { listingId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [favoriteMessage, setFavoriteMessage] = useState("");

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

  const handleAddFavorite = async () => {
    try {
      await addFavorite(listing._id);
      setFavoriteMessage("Added to favorites ❤️");

      setTimeout(() => {
        setFavoriteMessage("");
      }, 2500);
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

      if (!listing?.owner?._id) {
        alert("Owner not found.");
        return;
      }

      const ownerId = listing.owner._id;
      const response = await startConversation(listing._id, ownerId);
      navigate(`/conversations/${response.data._id}`);
    } catch (error) {
      console.log("Error starting conversation:", error);
      alert("Failed to start conversation.");
    }
  };

  const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this listing?"
  );

  if (!confirmDelete) return;

  try {
    await deleteListing(listing._id);
    navigate("/my-listings");
  } catch (error) {
    console.log("Error deleting listing:", error);
    alert("Failed to delete listing.");
  }
};

  if (isLoading) return <Spinner />;
  if (errorMessage) return <ErrorMessage message={errorMessage} />;
  if (!listing) return <ErrorMessage message="Listing not found." />;

  const myUserId = user?.payload?._id || user?._id;
  const isOwner = myUserId && listing?.owner?._id === myUserId;

  const cleanlinessLabels = {
    1: "Spotless",
    2: "Very Clean",
    3: "Clean",
    4: "Fair",
    5: "Very Poor",
  };

  const noiseLevelLabels = {
    1: "Very Noisy",
    2: "Noisy",
    3: "Moderate",
    4: "Quiet",
    5: "Very Quiet",
  };

  return (
    <div className="listing-details-page">
      <div className="listing-details-card">
        <div className="listing-details-image-wrapper">
          <img
            src={listing.photoUrl || "https://via.placeholder.com/1200x700"}
            alt={listing.title}
            className="listing-details-image"
          />

          <div className="listing-details-tags">
            {listing.petsAllowed && (
              <span className="listing-details-tag">🐶 Pet-friendly</span>
            )}

            {listing.smokerAllowed ? (
              <span className="listing-details-tag">🚬 Smoking allowed</span>
            ) : (
              <span className="listing-details-tag">🚭 Non-smoking</span>
            )}

            {(listing.cleanliness === 1 || listing.cleanliness === 2) && (
              <span className="listing-details-tag">🧼 Very clean</span>
            )}

            {(listing.noiseLevel === 4 || listing.noiseLevel === 5) && (
              <span className="listing-details-tag">🔇 Quiet</span>
            )}
          </div>
        </div>

        <div className="listing-details-content">
          <div className="listing-details-header">
            <div>
              <h1>{listing.title}</h1>
              <p className="listing-details-city">📍 {listing.city}</p>
            </div>

            <p className="listing-details-price">€{listing.price}/mo</p>
          </div>

          <div className="listing-details-meta">
            <p>
              <strong>Cleanliness:</strong>{" "}
              {cleanlinessLabels[listing.cleanliness] || "N/A"}
            </p>

            <p>
              <strong>Noise level:</strong>{" "}
              {noiseLevelLabels[listing.noiseLevel] || "N/A"}
            </p>

            <p>
              <strong>Pets:</strong>{" "}
              {listing.petsAllowed ? "Allowed" : "Not allowed"}
            </p>

            <p>
              <strong>Smoking:</strong>{" "}
              {listing.smokerAllowed ? "Allowed" : "Not allowed"}
            </p>

            <p>
              <strong>Owner:</strong> {listing.owner?.name}
            </p>
          </div>

          <div className="listing-details-actions">
            {isOwner ? (
              <>
                <Link
                  to="/my-listings"
                  className="listing-details-btn secondary"
                >
                  Back to My Listings
                </Link>

                <Link
                  to={`/listings/${listing._id}/edit`}
                  className="listing-details-btn secondary"
                >
                  Edit
                </Link>

                <button
                  className="listing-details-btn danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <div>
                  <button
                    className="listing-details-btn primary"
                    onClick={handleAddFavorite}
                  >
                    Add to Favorites
                  </button>

                  {favoriteMessage && (
                    <p className="favorite-success">{favoriteMessage}</p>
                  )}
                </div>

                <button
                  className="listing-details-btn secondary"
                  onClick={handleContactOwner}
                >
                  Contact Owner
                </button>

                <Link
                  to={`/users/${listing.owner._id}`}
                  className="listing-details-btn secondary"
                >
                  View Profile
                </Link>
              </>
            )}
          </div>
          <div className="listing-details-description">
            <h2>About this place</h2>
            <p>{listing.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;
