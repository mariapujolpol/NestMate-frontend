import api from "./api";

const myProfile = () => api.get("/users/me");
const getProfile = (userId) => api.get(`/users/${userId}`);
const updateProfile = (updatedData) => api.put("/users/profile", updatedData);
const uploadProfilePicture = (formData) =>
  api.post("/upload/profile-picture", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export { myProfile, getProfile, updateProfile, uploadProfilePicture };