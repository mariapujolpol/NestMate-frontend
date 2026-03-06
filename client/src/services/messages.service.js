import api from "./api";

const getMessagesByConversation = (conversationId) =>
  api.get(`/messages/${conversationId}`);

const sendMessage = (conversationId, messageData) =>
  api.post(`/messages/${conversationId}`, messageData);

export { getMessagesByConversation, sendMessage };