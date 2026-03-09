import api from "./api";

const getConversations = () => api.get("/conversations");
const startConversation = (listingId) => api.post("/conversations", { listingId });
const getConversationById = (conversationId) => api.get(`/conversations/${conversationId}`);

export { getConversations, startConversation, getConversationById };