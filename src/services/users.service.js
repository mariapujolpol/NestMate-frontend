import api from "./api";

const myProfile = () => api.get("/users/me");
const getProfile = (userId) => api.get(`/users/${userId}`);
const updateProfile = (updatedData) => api.put("/users/profile", updatedData);
const uploadImage = (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  return api.post("/upload", formData)
}

export { myProfile, getProfile, updateProfile, uploadImage };