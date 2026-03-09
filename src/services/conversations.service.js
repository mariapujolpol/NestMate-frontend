import api from "./api";

const getConversations = () => api.get("/conversations");
const startConversation = (listingId, receiverId) => api.post("/conversations", { listingId, receiverId });
const getConversationById = (conversationId) => api.get(`/conversations/${conversationId}`);

export { getConversations, startConversation, getConversationById };