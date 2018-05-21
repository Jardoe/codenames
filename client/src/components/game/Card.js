import React, {Component} from 'react';
import './style/Card.css'

class Card extends Component{
  constructor(props){
    super(props);
    this.handleClickEvent = this.handleClickEvent.bind(this)
  }

  handleClickEvent(){
    this.props.onCardClick(this.props.id);
    this.handleClickEvent = null;
  }

  render(){
    if (this.props.onCardClick == null) {
      return (
        <div className='card'>
          {this.props.word}
        </div>
      )
    }
    else if(this.props.isSpyMaster){
      return(
        <div className={this.props.colour + ' ' + this.props.visablility + " " + 'spymaster' + ' '
        + 'card'}>
          {this.props.word}
        </div>
      )
    }
    return (
      <div className={
        this.props.colour + ' '
        + this.props.visablility + ' '
        + 'card' }
        onClick={this.handleClickEvent}
        >
        {this.props.word}
      </div>
    )
  }
}

export default Card
