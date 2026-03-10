import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListingById, updateListing } from "../services/listings.service";
import "../css/EditListing.css";

function EditListing() {
  const { listingId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    city: "",
    price: "",
    description: "",
    cleanliness: "",
    noiseLevel: "",
    smokerAllowed: false,
    petsAllowed: false,
    photoUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getListingById(listingId);
        const listing = response.data;

        setFormData({
          title: listing.title || "",
          city: listing.city || "",
          price: listing.price || "",
          description: listing.description || "",
          cleanliness: listing.cleanliness ?? "",
          noiseLevel: listing.noiseLevel ?? "",
          smokerAllowed: listing.smokerAllowed || false,
          petsAllowed: listing.petsAllowed || false,
          photoUrl: listing.photoUrl || "",
        });
      } catch (error) {
        console.log(error);
        setErrorMessage("Error loading listing");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await updateListing(listingId, formData);
      navigate("/my-listings");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error updating listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMessage && !formData.title) return <p>{errorMessage}</p>;

  return (
  <div className="edit-listing-page">
    <div className="edit-listing-card">
      <div className="edit-listing-header">
        <h2>Edit Listing</h2>
        <p>Update your listing information</p>
      </div>

      <form onSubmit={handleSubmit} className="edit-listing-form">
        <div className="edit-listing-section">
          <h3>Basic information</h3>

          <label>
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              disabled
            />
          </label>

          <label>
            City
            <input
              type="text"
              name="city"
              value={formData.city}
              disabled
            />
          </label>

          <label>
            Price
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="edit-listing-section">
          <h3>Flat preferences</h3>

          <label>
            Cleanliness
            <input
              type="number"
              name="cleanliness"
              min="1"
              max="5"
              value={formData.cleanliness}
              onChange={handleChange}
            />
          </label>

          <label>
            Noise Level
            <input
              type="number"
              name="noiseLevel"
              min="1"
              max="5"
              value={formData.noiseLevel}
              onChange={handleChange}
            />
          </label>

          <label>
            Photo URL
            <input
              type="text"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
            />
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="petsAllowed"
              checked={formData.petsAllowed}
              onChange={handleChange}
            />
            Pets allowed
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="smokerAllowed"
              checked={formData.smokerAllowed}
              onChange={handleChange}
            />
            Smoker allowed
          </label>
        </div>

        {errorMessage && <p className="edit-listing-error">{errorMessage}</p>}

        <div className="edit-listing-actions">
          <button type="submit" className="edit-listing-btn" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default EditListing;