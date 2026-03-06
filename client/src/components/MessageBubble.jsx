function MessageBubble({ message,  }) {
  return (
    <div className={`message-bubble ${isOwnMessage ? 'own-message' : ''}`}>
      <p>{message.text}</p>
    </div>
  );
}

export default MessageBubble;