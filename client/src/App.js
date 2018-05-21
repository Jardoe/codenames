import React, { Component } from 'react';
import './App.css';
import ChatContainer from './containers/ChatContainer.js'
import GameContainer from './containers/GameContainer.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <GameContainer  className="game"/>
        <ChatContainer className="chat" />
      </div>
    );
  }
}

export default App;
