import React, {Component} from 'react';

class EndTurnButton extends Component{
  constructor(props){
    super(props)
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(){
    this.props.changeTurn();
  }
  render(){
    return (
      <div className="end-turn-button">
        <button onClick={this.handleButtonClick}>End turn</button>
      </div>
    )
  }
}

export default EndTurnButton;
