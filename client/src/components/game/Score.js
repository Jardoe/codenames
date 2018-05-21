import React from 'react';
import './style/Score.css'

  const Score = ({colour, score}) => {
  return (
    <div className={colour + ' ' + 'score'}>
      {colour}: {score} more
    </div>
  )
}

export default Score;
