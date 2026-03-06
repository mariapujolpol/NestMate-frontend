import { Link } from "react-router-dom";

function ListingCard({ listing }) {
  return (
    <div className="listing-card">
      <Link to={`/listings/${listing._id}`}>
        <h3>{listing.title}</h3>
        <p>{listing.description}</p>
        <p>Price: ${listing.price}</p>
      </Link>
    </div>
  );
}

export default ListingCard;