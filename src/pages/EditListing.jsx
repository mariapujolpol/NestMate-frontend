import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListingById, updateListing } from "../services/listings.service";
import Spinner from "../components/Spinner";
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

  if (loading) return <Spinner />;
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
              <input type="text" name="title" value={formData.title} disabled />
            </label>

            <label>
              City
              <input type="text" name="city" value={formData.city} disabled />
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
              <select
                name="cleanliness"
                value={formData.cleanliness}
                onChange={handleChange}
              >
                <option value="">Select cleanliness</option>
                <option value="1">Spotless</option>
                <option value="2">Very Clean</option>
                <option value="3">Clean</option>
                <option value="4">Fair</option>
                <option value="5">Very Poor</option>
              </select>
            </label>

            <label>
              Noise Level
              <select
                name="noiseLevel"
                value={formData.noiseLevel}
                onChange={handleChange}
              >
                <option value="">Select noise level</option>
                <option value="1">Very Noisy</option>
                <option value="2">Noisy</option>
                <option value="3">Moderate</option>
                <option value="4">Quiet</option>
                <option value="5">Very Quiet</option>
              </select>
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
            <button
              type="button"
              className="edit-listing-btn-secondary"
              onClick={() => navigate("/my-listings")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-listing-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditListing;