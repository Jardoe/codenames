const assert = require('assert');
const Game = require('../game.js')

describe("Game logic tests", function () {

  let game;

  beforeEach( function () {
    game = new Game();
  })

  it("should get word data", function () {
    game.getData();
    assert.equal(400, game.words.length);
  })

  it("should get 25 random words", function(){
    game.getData();
    game.getRandomItems();
    assert.equal(25, game.wordsForGame.length)
  })

  it('should create objects out of the words', function() {
    game.getData();
    game.getRandomItems();
    game.makeWordObjects();
    console.log(game.wordObjectArray);
    assert.equal(25, game.wordObjectArray.length)
  })

  it('should assign team words', function(){
    game.getData();
    game.getRandomItems();
    game.makeWordObjects();
    game.assignTeamWords();
    console.log(game.wordObjectArray);
    assert.equal(25, game.wordObjectArray.length)
  })

  it('should test shuffle', function(){
    game.getData();
    game.getRandomItems();
    game.makeWordObjects();
    game.assignTeamWords();
    game.shuffleWords();
    // assert.equal(25, game.wordObjectArray.length)

  })

  it('should assign starting team', function(){
    game.assignStartingTeam();
    assert.equal('blue', game.startingTeam)
  })
})
