import React from 'react';
import './ChatForm.css';

const ChatForm = ({ onSubmit, nameKeyUp, msgKeyUp, msg }) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" onKeyUp={nameKeyUp} placeholder="Enter your name" />
      <input type="text" onKeyUp={msgKeyUp} placeholder="Type something witty" />
      <input type="submit" name="submit" value="Send Message" />
    </form>
  );
};

export default ChatForm;
