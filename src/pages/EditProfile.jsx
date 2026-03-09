import React from "react";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myProfile, uploadProfilePicture, updateProfile } from "../services/users.service";
import { useParams, Link } from "react-router-dom";

function EditProfile() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    age: "",
    cleanliness: "",
    noiseLevel: "",
    smoker: false,
    pets: false,
    description: "",
    photoUrl : "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await myProfile();
        const user = response.data;
        setFormData({
          name: user.name || "",
          email: user.email || "",
          city: user.city || "",
          age: user.age || "",
          cleanliness: user.cleanliness || "",
          noiseLevel: user.noiseLevel || "",
          smoker: user.smoker || false,
          pets: user.pets || false,
          description: user.description || "",
          photoUrl: user.photoUrl || "",
        });
      } catch (error) {
        console.log("Error fetching profile:", error);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await updateProfile(formData);
      navigate("/profile");
    } catch (error) {
      console.log("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <div>
    <h1>Edit Profile</h1>

    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        City:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </label>
      <br /> 
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Cleanliness:
        <select
          name="cleanliness"
          value={formData.cleanliness}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <br />

      <label>
        Noise Level:
        <select
          name="noiseLevel"
          value={formData.noiseLevel}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <br />

      <label>
        Smoker:
        <input
          type="checkbox"
          name="smoker"
          checked={formData.smoker}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Pets:
        <input
          type="checkbox"
          name="pets"
          checked={formData.pets}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Save Changes"}
      </button>
    </form>
    
    
    
    
    
    
    
    
    
    
    
    
    
    </div>;
  
}

export default EditProfile;