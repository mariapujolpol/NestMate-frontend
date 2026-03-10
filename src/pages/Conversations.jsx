import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getConversations } from "../services/conversations.service";
import { AuthContext } from "../context/auth.context";
import "../css/Conversations.css";

function Conversations() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await getConversations();
        console.log("conversations:", response.data);
        setConversations(response.data);
      } catch (error) {
        console.log("Error fetching conversations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);

  if (isLoading) {
    return <p className="conversations-loading">Loading conversations...</p>;
  }

  if (!user) {
    return <p className="conversations-loading">Loading user...</p>;
  }

  if (conversations.length === 0) {
    return <p className="conversations-empty">No conversations yet.</p>;
  }

  return (
    <div className="conversations-page">
      <div className="conversations-container">
        <div className="conversations-header">
          <h2 className="conversations-title">Inbox</h2>
        </div>

        <div className="conversations-list">
          {conversations.map((conversation) => {
            const otherUser = conversation.participants.find(
              (participant) => participant._id !== user.payload._id,
            );

            return (
              <article key={conversation._id} className="conversation-card">
                <Link
                  to={`/conversations/${conversation._id}`}
                  className="conversation-link"
                >
                  <div className="conversation-left">
                    <img
                      src={
                        otherUser?.photoUrl ||
                        "https://via.placeholder.com/80x80?text=User"
                      }
                      alt={otherUser ? otherUser.name : "User"}
                      className="conversation-user-image"
                    />
                  </div>

                  <div className="conversation-center">
                    <div className="conversation-info">
                      <h3 className="conversation-user">
                        {otherUser ? otherUser.name : "User"}
                      </h3>

                      <p className="conversation-listing-title">
                        {conversation.listing?.title}
                      </p>

                      <div className="conversation-meta">
                        <span className="conversation-city">
                          {conversation.listing?.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="conversation-right">
                    <span className="conversation-price">
                      {conversation.listing?.price}€
                    </span>

                    <img
                      src={
                        conversation.listing?.photoUrl ||
                        "https://via.placeholder.com/100x80?text=Home"
                      }
                      alt={conversation.listing?.title || "Listing"}
                      className="conversation-listing-image"
                    />
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Conversations;
