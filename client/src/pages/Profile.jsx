import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { myProfile, getProfile } from "../services/users.service";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        if (userId) {
          const response = await getProfile(userId);
          setProfile(response.data);
          setIsOwnProfile(false);
        } else {
          const response = await myProfile();
          setProfile(response.data);
          setIsOwnProfile(true);
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
  }

  const handleCreateListing = () => {
    navigate("/listings/create");
  }

 

  if (loading) return <p>Loading...</p>;

  if (!profile) return <p>Profile not found.</p>;

 return (
  
  <div>

    <h1>Profile</h1>

    <p>{profile.name}</p>
    <p>{profile.email}</p>
    <p>{profile.city}</p>
    <p>{profile.age}</p>
    <p>{profile.description}</p>

    {isOwnProfile ? (
      <>
        <button onClick={handleEditProfile}>Edit Profile</button>
        <button onClick={handleCreateListing}>Create Listing</button>
      </>
    ) : (
      <button>Send Message</button>
    )}

  </div>

);
}

/* return (

    <div>

      <h1>{User.name}</h1>

      <img src={User.photoUrl} alt="Profile" />
      <p>City: {User.city}</p>
      <p>Age: {User.age}</p>
      <p>Cleanless: {User.cleanliness}</p>
      <p>Noise level: {User.noiseLevel}</p>
      <p>Pet friendly: {User.pets ? "Yes" : "No"}</p>
      <p>Smoking : {User.smoker ? "Yes" : "No"}</p>

      <p>About me: {User.description}</p>
      <p>Favorites: {User.favorites}</p>
      </div>
  )*/

export default Profile;
