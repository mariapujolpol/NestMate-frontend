import { useEffect, useState } from "react";
import { getAllListings } from "../services/listings.service";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

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

  if (isLoading) return <Spinner />;
  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  return (
    <div>
      <h1>All Listings</h1>

      {listings.map((listing) => (
        <div key={listing._id}>
          <h3>{listing.title}</h3>
          <p>{listing.city}</p>
        </div>
      ))}
    </div>
  );
}

export default Listings;