const fs = require('fs');

class Game {
  constructor() {
    this.words = [];
    this.wordsForGame = [];
    this.wordObjectArray = [];
    this.startingTeam = null;
    this.round = 1;
    this.teams = ['red', 'blue'];
    this.blueScore = 8;
    this.redScore = 8;
    this.currentTeam = null;
  }

  assignStartingTeam() {
    this.startingTeam = this.teams[Math.floor(Math.random()*2)];
    this.currentTeam = this.startingTeam;
  }

  getData(){
    const text = fs.readFileSync("/Users/user/codeclan/test_project/server/model/words.txt", "utf-8");
    this.words = text.trim().split('\n');
  }

  getRandomItems() {
    let n = 25;
    var result = new Array(n),
    len = this.words.length,
    taken = new Array(len);
    if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = this.words[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return this.wordsForGame = result;
  }

  makeWordObjects() {
    this.wordsForGame.forEach((word) => {
      const wordObject = {word: word, visablility: 'hidden'}
      this.wordObjectArray.push(wordObject);
    })
  }

  assignTeamWords() {
    for(let i=0; i<8; i++){
      this.wordObjectArray[i].colour = "red";
    }
    for(let i=8; i<16; i++){
      this.wordObjectArray[i].colour = "blue";
    }
    for(let i=16; i<17; i++){
      this.wordObjectArray[i].colour = "black";
    }
    for(let i=17; i<24; i++){
      this.wordObjectArray[i].colour = "neutral";
    }
    for(let i=24; i<25; i++){
      this.wordObjectArray[i].colour = this.startingTeam;
      if (this.startingTeam == 'blue') {
        this.blueScore ++
      } else {
        this.redScore ++
      }
    }
  }

  shuffleWords(){
    let counter = this.wordObjectArray.length
    while(counter > 0){
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = this.wordObjectArray[counter];
      this.wordObjectArray[counter] = this.wordObjectArray[index];
      this.wordObjectArray[index] = temp;
    }
    console.log(this.wordObjectArray);
    return this.wordObjectArray;
  }

  buildGame(){
    this.wordObjectArray = [];
    this.assignStartingTeam();
    this.getData();
    this.getRandomItems();
    this.makeWordObjects();
    this.assignTeamWords();
    this.shuffleWords();
    return this;
  }
}


module.exports = Game;
