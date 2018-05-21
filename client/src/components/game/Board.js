import React, {Component} from 'react';
import Card from './Card.js'

const Board = (props) => {
  if (props.words == null || props.words.length === 0) {
    const nullCards = [];
    {for(let i = 0; i <25; i++) {
      nullCards.push(
        <Card
          key={i}
          word="CODENAMES"
          onCardClick={null}
        />
      )
    }
  }
  return (
    <div>
      <p>Press New Game Button</p>
      {nullCards}
    </div>
  )
}

return (
  <div>
    {props.words.map((word, index) => {
      return (
        <Card
          id={index}
          key={index}
          word={word.word}
          colour={word.colour}
          visablility={word.visablility}
          onCardClick={props.onCardClick}
          isSpyMaster={props.isSpyMaster}
        />
      )
    })}
  </div>
)
}
export default Board;
