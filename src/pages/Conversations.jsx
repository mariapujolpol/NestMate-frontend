import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getConversations } from "../services/conversations.service";
import { AuthContext } from "../context/auth.context";

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
    return <p>Loading conversations...</p>;
  }

  if (!user) {
    return <p>Loading user...</p>;
  }

  if (conversations.length === 0) {
    return <p>No conversations yet.</p>;
  }

  return (
    <div>
      <h2>Inbox</h2>

      {conversations.map((conversation) => {
        const otherUser = conversation.participants.find(
          (participant) => participant._id !== user._id
        );

        return (
          <article key={conversation._id}>
            <Link to={`/conversations/${conversation._id}`}>
              <h3>{otherUser ? otherUser.name : "User"}</h3>
              <p>{conversation.listing?.title}</p>
              <p>{conversation.listing?.city}</p>
              <p>{conversation.listing?.price}€</p>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export default Conversations;