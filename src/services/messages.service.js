import api from "./api";

const getMessagesByConversation = (conversationId) =>
  api.get(`/messages/conversations/${conversationId}`);

const sendMessage = (conversationId, messageData) =>
  api.post(`/messages/conversations/${conversationId}`, messageData);

export { getMessagesByConversation, sendMessage };