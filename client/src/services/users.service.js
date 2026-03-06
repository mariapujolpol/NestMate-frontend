import api from "./api";

const getProfile = () => api.get("/users/profile");
const updateProfile = (updatedData) => api.put("/users/profile", updatedData);
const uploadProfilePicture = (formData) =>
  api.post("/upload/profile-picture", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export { getProfile, updateProfile, uploadProfilePicture };