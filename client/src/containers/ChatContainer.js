import React from 'react';
import ChatForm from '../components/message/ChatForm';
import Message from '../components/message/Message';
import io from 'socket.io-client';
import './ChatContainer.css';

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      name: null,
      msg: null
    };

    this.socket = io("http://localhost:3001");
    this.socket.on('chat', this.addMessage.bind(this));

    this.submitForm = this.submitForm.bind(this);
    this.nameKeyUp = this.nameKeyUp.bind(this);
    this.msgKeyUp = this.msgKeyUp.bind(this);
  }

  nameKeyUp(event) {
    this.setState({
      name: event.target.value
    });
  }

  msgKeyUp(event) {
    this.setState({
      msg: event.target.value
    });
  }

  addMessage(message){
    const messages = this.state.messages;
    const newMessages = [message, ...messages];
    this.setState({
      messages: newMessages
    });
  }

  submitForm(event) {
    event.preventDefault();

    // Make sure we have a name & message before proceeding
    if (this.state.name && this.state.msg) {
      // construct a new message
      const newMessage = { author: this.state.name, text: this.state.msg };

      this.socket.emit('chat', newMessage);
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      return <Message key={index} author={message.author} text={message.text} />
    });

    return (
      <div className="chatContainer">
        <ChatForm
          nameKeyUp={this.nameKeyUp}
          msgKeyUp={this.msgKeyUp}
          onSubmit={this.submitForm}
        />
        {messages}
      </div>
    );
  }
}
