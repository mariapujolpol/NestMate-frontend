import api from "./api";

const getFavorites = () => api.get(`/favorites`);
const addFavorite = (listingId) => api.patch(`/favorites/${listingId}`);
const removeFavorite = (listingId) => api.delete(`/favorites/${listingId}`);

export { getFavorites, addFavorite, removeFavorite };