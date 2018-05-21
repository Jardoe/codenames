import React, {Component} from 'react';
import Status from '../components/game/Status.js'
import Board from '../components/game/Board.js'
import EndTurnButton from '../components/game/EndTurnButton.js'
import Score from '../components/game/Score.js'
import io from 'socket.io-client';
import NewGameButton from '../components/game/NewGameButton.js'
import RoleCheckbox from '../components/game/RoleCheckbox.js'
import Header from '../components/game/Header.js'
import './GameContainer.css'


class GameContainer extends Component{
  constructor(props){
    super(props);

    this.state ={
      game: 0,
      // change to null, give preface in components to render null
      revealedCards: [],
      spymaster: false,
      message: null
    }

    this.socket = io("http://localhost:3001");
    this.reset = this.reset.bind(this);
    this.socket.on('newGame', this.renderGame.bind(this))
    this.socket.on('cardClick', this.changeVisability.bind(this))
    this.socket.on('cardClick', this.changeScore.bind(this))
    this.socket.on('cardClick', this.checkClick.bind(this))
    this.socket.on('endTurnClicked', () => {
      console.log('endTurnClicked event received from server')
      this.changeTurn()
    })
    this.cardClick = this.cardClick.bind(this);
    this.endTurnClicked = this.endTurnClicked.bind(this)
    this.viewChangeToggle = this.viewChangeToggle.bind(this);
    this.otherTeam = this.otherTeam.bind(this)
  }

  cardClick(clickedIndex){
    this.socket.emit('cardClick', clickedIndex);
  }

  reset(){
    this.socket.emit('newGame');
  }

  endTurnClicked(){
    console.log('emittined endTurnClicked from client')
    this.socket.emit('endTurnClicked')
  }

  otherTeam(){
    if(this.state.currentTeam == 'red'){
      return 'blue'
    } else if ( this.state.currentTeam == 'blue'){
      return 'red'
    } else {
      return;
    }
  }

  checkClick(clickedIndex){
    console.log('checkClick called')
    let colour = this.state.wordObjectArray[clickedIndex].colour;
    if (colour == this.state.currentTeam) {
      let message = null;
      this.setState({message: message})
    } else if( colour == this.otherTeam() ){
      let message = "Your team chose the other teams card!"
      this.setState({message: message})

      console.log('calling endTurnClicked -- wrong team');

      this.endTurnClicked();
    } else if( colour == "neutral"){
      let message = 'Your team choose a neutral card'
      this.setState({message: message})

      console.log('calling endTurnClicked -- neutral');

      this.endTurnClicked();
    } else if ( colour == "black"){
      let message = 'Your team choose the assassin'
      this.setState({message: message})
      this.changeTurn();
    }
  }

  changeTurn(){
    console.log('change turn');
    const newTeam = this.otherTeam();
    this.setState({currentTeam: newTeam})
  }

  changeVisability(clickedIndex){
    const copyOfWordObjectArray = [...this.state.wordObjectArray];
    const newVisability = copyOfWordObjectArray[clickedIndex];
    newVisability.visablility = "revealed";
    this.setState({ wordObjectArray: copyOfWordObjectArray })
  }

  changeScore(clickedIndex){
    const clickedCard = this.state.wordObjectArray[clickedIndex];
    let copyOfBlueScore = this.state.blueScore
    let copyOfRedScore = this.state.redScore
    if (clickedCard.colour === "red" && copyOfRedScore > 0) {
      this.setState({redScore: (copyOfRedScore-1)})
    } else if (clickedCard.colour === "blue" && copyOfBlueScore > 0){
      this.setState({blueScore: (copyOfBlueScore-1)})
    }
  }

  renderGame(gameObj){
    this.setState({ ...gameObj });
  }

  viewChangeToggle(status){
    this.setState({spymaster: status})
  }

  render(){
    return (
      <div className="gameContainer">
        <Header />
        <Status currentTeam={this.state.currentTeam}
          redScore={this.state.redScore}
          blueScore={this.state.blueScore}
          message={this.state.message}
        />
        <div className="score-section">
          <Score colour="red" score={this.state.redScore}/> - <Score colour="blue" score={this.state.blueScore}/>
        </div>
        <EndTurnButton changeTurn={this.endTurnClicked}/>
        <NewGameButton startNewGame={this.reset}/>
        <RoleCheckbox onChange={this.viewChangeToggle}/>
        <Board  onCardClick={this.cardClick} words={this.state.wordObjectArray}
          isSpyMaster = {this.state.spymaster}/>
        </div>
      )
    }
  }

  export default GameContainer;
