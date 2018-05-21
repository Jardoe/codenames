import React, {Component} from 'react';

class NewGameButton extends Component{
  constructor (props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick(){
    this.props.startNewGame()
  }
  
  render(){
    return (
      <div className="new-game-button" >
        <button onClick={this.handleButtonClick}>New Game</button>
      </div>
    )
  }
}

export default NewGameButton;
