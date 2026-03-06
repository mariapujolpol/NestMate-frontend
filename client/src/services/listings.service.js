import api from "./api";

const getAllListings = () => api.get("/listings");
const getListingById = (listingId) => api.get(`/listings/${listingId}`);
const createListing = (listingData) => api.post("/listings", listingData);
const updateListing = (listingId, updatedData) => api.put(`/listings/${listingId}`, updatedData);
const deleteListing = (listingId) => api.delete(`/listings/${listingId}`);
const addToFavorites = (listingId) => api.post(`/favorites/${listingId}`);

export {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  addToFavorites
};