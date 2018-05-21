import React from 'react';

const Status = (props) => {
  if (props.currentTeam == null || props.currentTeam.length ===0) {
    return <p></p>
  } else if (props.redScore === 0){
    return <h3>Red team won!</h3>
  } else if (props.blueScore === 0) {
    return <h3> Blue team won!</h3>
  } else if (props.message == 'Your team choose the assassin'){
    return  (
      <div>
        <h3>{props.message}</h3>
        <h3> {props.currentTeam} team won!</h3>
      </div>
    )
  } else {
    return (
      <div className="header">
        <h3>{props.message}</h3>
        <h3>It's {props.currentTeam} teams turn</h3>
      </div>
    )
  }
}

export default Status;
