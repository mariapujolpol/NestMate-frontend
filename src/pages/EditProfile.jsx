import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myProfile, updateProfile } from "../services/users.service";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import "../css/EditProfile.css";

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
    photoUrl: "",
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

  if (loading) return <Spinner />;
  if (error && !formData.name) return <ErrorMessage message={error} />;

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">
        <div className="edit-profile-header">
          <div>
            <h1>Edit Profile</h1>
            <p>Update your personal info and flatmate preferences.</p>
          </div>

          <img
            src={formData.photoUrl || "https://via.placeholder.com/220x220"}
            alt={formData.name || "Profile preview"}
            className="edit-profile-preview"
          />
        </div>

        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="edit-profile-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Cleanliness</label>
              <select
                name="cleanliness"
                value={formData.cleanliness}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="1">1 - Very relaxed</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 - Very clean</option>
              </select>
            </div>

            <div className="form-group">
              <label>Noise level</label>
              <select
                name="noiseLevel"
                value={formData.noiseLevel}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="1">1 - Very quiet</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 - Very social/loud</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Photo URL</label>
              <input
                type="text"
                name="photoUrl"
                placeholder="Paste your photo URL"
                value={formData.photoUrl}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>About you</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Tell others a bit about yourself, your habits, and what kind of flatmate you are."
              />
            </div>
          </div>

          <div className="checkbox-row">
            <label className="checkbox-pill">
              <input
                type="checkbox"
                name="smoker"
                checked={formData.smoker}
                onChange={handleChange}
              />
              <span>Smoker</span>
            </label>

            <label className="checkbox-pill">
              <input
                type="checkbox"
                name="pets"
                checked={formData.pets}
                onChange={handleChange}
              />
              <span>Pets</span>
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <button
              type="button"
              className="edit-profile-btn secondary"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-profile-btn primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;