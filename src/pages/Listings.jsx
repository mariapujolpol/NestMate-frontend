import { useEffect, useState } from "react";
import { getAllListings } from "../services/listings.service";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import ListingCard from "../components/ListingCard";
import { Link } from "react-router-dom";



function Listings() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
      await addToFavorites(listingId);
      alert("Listing added to favorites!");
    } catch (error) {
      console.log(error);
      alert("Failed to add listing to favorites.");
    }
  };

  if (isLoading) return <Spinner />;
  if (errorMessage) return <ErrorMessage message={errorMessage} />;

 
  return (

    <div>

      <h1>All Listings</h1>



      {listings.map((listing) => (

        <div key={listing._id}>

          <h3>{listing.title}</h3>

          <p>{listing.city}</p>

          <p>Price: ${listing.price}</p>

          <button onClick = {() => handleAddFavorite(listing._id)}>Add to Favorites</button>

          <Link to={`/listings/${listing._id}`}>
          <img src={listing.photoUrl} alt={listing.title} width="250" />
        </Link>

        </div>

      ))}

    </div>
  );
}

export default Listings;