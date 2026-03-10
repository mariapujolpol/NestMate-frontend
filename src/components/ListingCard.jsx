import { Link } from "react-router-dom";
import "../ListingCard.css";

function ListingCard({
  listing,
  onFavoriteClick,
  favoriteIcon = "♡",
  extraLabel = "Shared flat",
}) {
  return (
    <article className="listing-card">
      <Link to={`/listings/${listing._id}`} className="listing-card-link">
        <div className="listing-image-wrapper">
          <img
            src={listing.photoUrl || "https://via.placeholder.com/400x300"}
            alt={listing.title}
            className="listing-image"
          />

          <button
            className="favorite-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFavoriteClick?.(listing._id);
            }}
          >
            {favoriteIcon}
          </button>

          <div className="listing-tags">
            {listing.petsAllowed && (
              <span className="listing-tag">🐶 Pet-friendly</span>
            )}

            {listing.smokerAllowed ? (
              <span className="listing-tag smoking">🚬 Smoking allowed</span>
            ) : (
              <span className="listing-tag no-smoking">🚭 Non-smoking</span>
            )}
          </div>
        </div>

        <div className="listing-info">
          <h3 className="listing-title">{listing.title}</h3>

          <p className="listing-city">📍 {listing.city}</p>

          <div className="listing-bottom">
            <p className="listing-price">€{listing.price}/mo</p>
            <p className="listing-extra">{extraLabel}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ListingCard;
