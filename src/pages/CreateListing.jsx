import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../services/listings.service";
import "../css/CreateListing.css";

function CreateListing() {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const listingData = {
        ...formData,
        price: Number(formData.price),
        cleanliness: Number(formData.cleanliness),
        noiseLevel: Number(formData.noiseLevel),
      };

      await createListing(listingData);

      navigate("/listings");
    } catch (error) {
      console.log("Error creating listing:", error);
    }
  };

  return (
    <div className="create-listing-page">
      <div className="create-listing-card">
        <h1>Create Listing</h1>
        <p className="create-listing-subtitle">
          Fill in the details to publish your room or apartment.
        </p>

        <form onSubmit={handleSubmit} className="create-listing-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Cozy room in central Berlin"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="Berlin"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                placeholder="850"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe the place, room, neighborhood and ideal flatmate..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cleanliness</label>
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
            </div>
            <div className="form-group">
              <label>Noise Level</label>
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
            </div>
          </div>

          <div className="form-group">
            <label>Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              placeholder="https://example.com/photo.jpg"
              value={formData.photoUrl}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Preferences</label>
            <div className="checkbox-group">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="smokerAllowed"
                  checked={formData.smokerAllowed}
                  onChange={handleChange}
                />
                Smoker Allowed
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="petsAllowed"
                  checked={formData.petsAllowed}
                  onChange={handleChange}
                />
                Pets Allowed
              </label>
            </div>
          </div>

          <button type="submit" className="create-listing-button">
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;
