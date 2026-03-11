import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { myProfile, getProfile } from "../services/users.service";
import { getMyListings } from "../services/listings.service";
import "../css/Profile.css";


function Profile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [myListingsCount, setMyListingsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        if (userId) {
          const response = await getProfile(userId);
          setProfile(response.data);
          setIsOwnProfile(false);
          setMyListingsCount(0);
        } else {
          const response = await myProfile();
          setProfile(response.data);
          setIsOwnProfile(true);
          const listingsResponse = await getMyListings();
          setMyListingsCount(listingsResponse.data.length);
        }
      } catch (error) {
        console.log("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handleCreateListing = () => {
    navigate("/listings/create");
  };

  const handleMyListings = () => {
    navigate("/my-listings");
  };

  if (loading) return <p className="profile-loading">Loading...</p>;
  if (!profile) return <p className="profile-loading">Profile not found.</p>;

  const cleanlinessLabels = {
    1: "Spotless",
    2: "Very Clean",
    3: "Clean",
    4: "Fair",
    5: "Very Poor",
  };

  const noiseLevelLabels = {
    1: "Very Noisy",
    2: "Noisy",
    3: "Moderate",
    4: "Quiet",
    5: "Very Quiet",
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        {isOwnProfile && (
          <button className="profile-edit-top" onClick={handleEditProfile}>
            ⚙️ Edit
          </button>
        )}
        <div className="profile-header">
          <img
            src={profile.photoUrl || "/avatar.png"}
            alt={profile.name}
            className="profile-avatar"
          />

          <div className="profile-header-info">
            <h1>{profile.name}</h1>
            <p className="profile-city">📍 {profile.city || "No city added"}</p>

            {isOwnProfile && (
              <p className="profile-listings-count">
                🏠 Listings: {myListingsCount}
              </p>
            )}

            <div className="profile-badges">
              {profile.age && (
                <span className="profile-badge">{profile.age} years old</span>
              )}

              {profile.pets === true && (
                <span className="profile-badge">🐶 Pet-friendly</span>
              )}

              {profile.smoker === true ? (
                <span className="profile-badge">🚬 Smoker</span>
              ) : (
                <span className="profile-badge">🚭 Non-smoker</span>
              )}

              {profile.cleanliness >= 4 && (
                <span className="profile-badge">🧼 Very clean</span>
              )}

              {profile.noiseLevel <= 2 && (
                <span className="profile-badge">🔇 Quiet</span>
              )}
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>About</h2>
            <p>{profile.description || "No description added yet."}</p>
          </div>

          <div className="profile-section">
            <h2>Profile details</h2>
            <div className="profile-details-grid">
              <p>
                <strong>Email:</strong>{" "}
                {isOwnProfile ? profile.email : "Private"}
              </p>
              <p>
                <strong>City:</strong> {profile.city || "N/A"}
              </p>
              <p>
                <strong>Age:</strong> {profile.age || "N/A"}
              </p>
              <p>
                <strong>Cleanliness:</strong>{" "}
                {cleanlinessLabels[profile.cleanliness] || "N/A"}
              </p>

              <p>
                <strong>Noise level:</strong>{" "}
                {noiseLevelLabels[profile.noiseLevel] || "N/A"}
              </p>
              <p>
                <strong>Pets:</strong> {profile.pets ? "Yes" : "No"}
              </p>
              <p>
                <strong>Smoker:</strong> {profile.smoker ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <div className="profile-actions">
            {isOwnProfile ? (
              <>
                <button
                  className="profile-btn secondary"
                  onClick={handleCreateListing}
                >
                  Create Listing
                </button>

                <button
                  className="profile-btn secondary"
                  onClick={handleMyListings}
                >
                  My Listings
                </button>
              </>
            ) : (
              <button className="profile-btn primary">Send Message</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
