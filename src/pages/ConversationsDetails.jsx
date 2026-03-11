import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  getMessagesByConversation,
  sendMessage,
} from "../services/messages.service";
import "../css/ConversationsDetails.css";

function ConversationDetails() {
  const { conversationId } = useParams();
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const myUserId = user?.payload?._id;

  const otherUser = conversation?.participants?.find(
    (participant) => participant?._id !== myUserId,
  );

  const fetchMessages = async () => {
    try {
      setIsRefreshing(true);

      const response = await getMessagesByConversation(conversationId);
      console.log("messages:", response.data);

      setConversation(response.data.conversation);
      setMessages(response.data.messages);
    } catch (error) {
      console.log("Error fetching messages:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!text.trim()) return;

  try {
    await sendMessage(conversationId, { text });
    setText("");
    fetchMessages();
  } catch (error) {
    console.log("Error sending message:", error);
  }
};

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-header-top">
            <div className="chat-header-info">
              <img
                src={
                  otherUser?.photoUrl ||
                  "https://via.placeholder.com/80x80?text=User"
                }
                alt={otherUser ? otherUser.name : "User"}
                className="chat-user-avatar"
              />

              <div className="chat-header-text">
                <h1 className="chat-title">
                  {otherUser ? otherUser.name : "User"}
                </h1>
                <p className="chat-subtitle">
                  {conversation?.listing?.title || "Conversation"}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="chat-refresh-button"
              onClick={fetchMessages}
              disabled={isRefreshing}
            >
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <p className="chat-empty">No messages yet.</p>
          ) : (
            messages.map((message) => {
              const isMine = message.sender?._id === user?.payload?._id;

              return (
                <div
                  key={message._id}
                  className={`chat-message ${isMine ? "chat-message-mine" : "chat-message-other"}`}
                >
                  <div className="chat-message-header">
                    <strong className="chat-sender">
                      {isMine ? "You" : message.sender?.name}
                    </strong>
                  </div>

                  <div className="chat-bubble">
                    <p className="chat-text">{message.text}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            className="chat-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a message..."
          />

          <button className="chat-send-button" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConversationDetails;
