import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getMessagesByConversation, sendMessage } from "../services/messages.service";

function ConversationDetails() {
  const { conversationId } = useParams();
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessagesByConversation(conversationId);
        console.log("messages:", response.data);
        setMessages(response.data);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [conversationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      const response = await sendMessage(conversationId, { text });

      setMessages((prev) => [...prev, response.data]);
      setText("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div>

      <h2>Conversation</h2>

      <div>
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((message) => {
            const isMine =
              message.sender?._id === user?._id;

            return (
              <div key={message._id}>
                <strong>{isMine ? "You" : message.sender?.name}</strong>
                <p>{message.text}</p>
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a message..."
        />
        <button type="submit">Send</button>
      </form>

    </div>
  );
}

export default ConversationDetails;