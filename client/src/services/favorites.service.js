import api from "./api";

const getFavourites = () => api.get("/users/favourites");
const addFavourite = (listingId) => api.patch(`/users/favourites/${listingId}`);
const removeFavourite = (listingId) => api.delete(`/users/favourites/${listingId}`);

export { getFavourites, addFavourite, removeFavourite };