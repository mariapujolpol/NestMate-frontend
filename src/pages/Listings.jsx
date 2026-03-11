import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllListings } from "../services/listings.service";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import ListingCard from "../components/ListingCard";
import { addFavorite } from "../services/favorites.service";
import "../css/Listings.css";

function Listings() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [favoriteMessage, setFavoriteMessage] = useState(null);

  const [filters, setFilters] = useState({
    city: "",
    petsAllowed: false,
    smokerAllowed: false,
    cleanliness: "",
    noiseLevel: "",
  });

  const [sortOrder, setSortOrder] = useState("");

  const location = useLocation();

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

  // Leer ciudad desde URL (search de Home)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const city = params.get("city");

    if (city) {
      setFilters((prev) => ({
        ...prev,
        city: city,
      }));
    }
  }, [location.search]);

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

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (isLoading) return <Spinner />;
  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  // ciudades únicas
  const cities = [...new Set(listings.map((listing) => listing.city))].sort();

  const filteredListings = listings.filter((listing) => {
    if (
      filters.city &&
      !listing.city.toLowerCase().includes(filters.city.toLowerCase())
    ) {
      return false;
    }

    if (filters.petsAllowed && !listing.petsAllowed) {
      return false;
    }

    if (filters.smokerAllowed && !listing.smokerAllowed) {
      return false;
    }

    if (
      filters.cleanliness &&
      listing.cleanliness !== Number(filters.cleanliness)
    ) {
      return false;
    }

    if (
      filters.noiseLevel &&
      listing.noiseLevel !== Number(filters.noiseLevel)
    ) {
      return false;
    }

    return true;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    }

    if (sortOrder === "desc") {
      return b.price - a.price;
    }

    return 0;
  });

  return (
    <div className="listings-page">
      <h1>All Listings</h1>

      <div className="filters-bar">
        {/* CITY FILTER */}
        <select name="city" value={filters.city} onChange={handleFilterChange}>
          <option value="">All Cities</option>

          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* SORT PRICE */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort Price</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>

        {/* CLEANLINESS */}
        <select
          name="cleanliness"
          value={filters.cleanliness}
          onChange={handleFilterChange}
        >
          <option value="">Cleanliness</option>
          <option value="1">Spotless</option>
          <option value="2">Very Clean</option>
          <option value="3">Clean</option>
          <option value="4">Fair</option>
          <option value="5">Very Poor</option>
        </select>

        {/* NOISE */}
        <select
          name="noiseLevel"
          value={filters.noiseLevel}
          onChange={handleFilterChange}
        >
          <option value="">Noise Level</option>
          <option value="1">Very Noisy</option>
          <option value="2">Noisy</option>
          <option value="3">Moderate</option>
          <option value="4">Quiet</option>
          <option value="5">Very Quiet</option>
        </select>

        {/* PETS */}
        <label>
          <input
            type="checkbox"
            name="petsAllowed"
            checked={filters.petsAllowed}
            onChange={handleFilterChange}
          />
          Pets
        </label>

        {/* SMOKING */}
        <label>
          <input
            type="checkbox"
            name="smokerAllowed"
            checked={filters.smokerAllowed}
            onChange={handleFilterChange}
          />
          Smoking
        </label>
      </div>

      <div className="listings-grid">
        {sortedListings.map((listing) => {
          return (
            <div key={listing._id} className="listing-card-wrapper">
              <ListingCard
                listing={listing}
                onFavoriteClick={handleAddFavorite}
                favoriteIcon="♡"
              />

              {favoriteMessage === listing._id && (
                <div className="favorite-popup">❤️ Added to favorites</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Listings;
