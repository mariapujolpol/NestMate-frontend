import React from "react";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../services/listings.service";
import { useParams, Link } from "react-router-dom";

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
        await createListing(formData);
        navigate("/listings");
      } catch (error) {
        console.log("Error creating listing:", error);
      }
    };

  return <div>
    <h1>Create Listing</h1>
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <label>City:</label>
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />
      <label>Price:</label>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <label>Description:</label>
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <label>Cleanliness:</label>
      <select
        name="cleanliness"
        value={formData.cleanliness}
        onChange={handleChange}
      >
        <option value="">Select Cleanliness</option>
        <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
      </select>
      <label>Noise Level:</label>
      <select
        name="noiseLevel"
        value={formData.noiseLevel}
        onChange={handleChange}
      >
        <option value="">Select Noise Level</option>
       <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
      </select>
      <label>Photo URL:</label>
      <input
        type="text"
        name="photoUrl"
        placeholder="Photo URL"
        value={formData.photoUrl}
        onChange={handleChange}
      />  
      <label>
        <input
          type="checkbox"
          name="smokerAllowed"
          checked={formData.smokerAllowed}
          onChange={handleChange}
        />
        Smoker Allowed
      </label>
      <label>
        <input
          type="checkbox"
          name="petsAllowed"
          checked={formData.petsAllowed}
          onChange={handleChange}
        />
        Pets Allowed
      </label>
      <button type="submit">Create Listing</button>
    </form>
  </div>;
}

export default CreateListing;