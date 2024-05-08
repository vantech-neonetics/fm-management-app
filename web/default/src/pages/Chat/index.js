import React from 'react';

const Chat = () => {
  // Get the chat link from local storage
  const chatLink = localStorage.getItem('chat_link');

  return (
    <iframe
      // Set the source of the iframe to the chatLink
      src={chatLink}
      // Apply styling to the iframe
      style={{ width: '100%', height: '85vh', border: 'none' }}
    />
  );
};

export default Chat;