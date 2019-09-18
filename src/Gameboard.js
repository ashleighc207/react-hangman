import React, {
  Component
} from 'react';
import './Gameboard.css';
import Hangman from './Hangman.js';
import AlphaButtons from './AlphaButtons.js';

class Gameboard extends Component {
  static defaultProps = {
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    mysteryWord: 'New Car',
    bodyParts: ['head', 'body', 'arm-l', 'arm-r', 'leg-l', 'leg-r'],
    wordList: ['apple', 'tree house', 'vacation', 'nope rope', 'weather', 'pizza place', 'nice view']
  }
  state = {
    currentWord: this.props.mysteryWord,
    splitWord: this.props.mysteryWord.toLowerCase().split(''),
    bodyParts: this.props.bodyParts,
    status: 'in-progress'
  }

  constructor(props) {
    super(props);
    this.pressKey = this.pressKey.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.generateNewWord = this.generateNewWord.bind(this);
    this.enableButtons = this.enableButtons.bind(this);
  }

  resetBoard() {
    this.generateNewWord()
    this.enableButtons()
    this.state.bodyParts.map(part => {
      document.getElementById(part).style.opacity = 0;
    })

  }

  generateNewWord(){
    let tiles = document.getElementsByClassName('Gameboard--single-tile');
    for(let i = 0; i < tiles.length; i++){
      tiles[i].removeAttribute('visible')
      if(tiles[i].getAttribute('value') !== ' '){
        tiles[i].innerText = '_';
      }
    }
    let randWord =  this.props.wordList[Math.floor(Math.random()* this.props.wordList.length)];
    this.setState({
      currentWord: randWord,
      splitWord: randWord.toLowerCase().split(''),
      status: 'in-progress',
      bodyParts: this.props.bodyParts
    })
  }

  enableButtons() {
    let buttons = document.getElementsByClassName('AlphaButtons--button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].removeAttribute('disabled')
    }
  }

  disableButtons() {
      let buttons = document.getElementsByClassName('AlphaButtons--button');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('disabled', true)
      }
  }

  hasWon(tilesArr){
    let wonTiles = tilesArr.filter(tile => tile.getAttribute('visible') === 'true')
    let existingTiles = tilesArr.filter(tile => tile.getAttribute('value') !== ' ');
    if(wonTiles.length === existingTiles.length){
      this.setState({status: 'won'})
      this.disableButtons()
    }
  }

  showTile(tilesArr, key){
    let idx = tilesArr.filter(function(t, i){
       return t.getAttribute('value') === key
      })
      idx.forEach(function(item){
        item.innerText = key;
        item.setAttribute('visible', true)
      })

      this.hasWon(tilesArr)
  }

  loseTurn(tilesArr, key){
    if (this.state.bodyParts.length > 0) {
      document.getElementById(this.state.bodyParts[0]).style.opacity = 1;
      let newBody = this.state.bodyParts.filter((n, i) => {
        return (i !== 0) ? n : null;
      })
      this.setState({
        bodyParts: newBody
      })
      if (this.state.bodyParts.length <= 1) {
        this.disableButtons();
        this.setState({
          status: 'lost'
        })
      }
    }
  }

  pressKey(key) {
    document.getElementById(key).setAttribute('disabled', true)
    let tiles = document.getElementsByClassName('Gameboard--single-tile');
    let tilesArr = [];
    for (let i = 0; i < tiles.length; i++) {
      tilesArr.push(tiles[i]);
    }
    if (tilesArr.some(t => { return t.getAttribute('value') === key})) {
      this.showTile(tilesArr, key);
    } else {
      this.loseTurn(tilesArr, key)
    }
  }


  render() {
    return (
      <div>
        <h1 className="Gameboard--title">{this.state.status === 'lost' ? 'Better Luck Next Time!' : this.state.status === 'won' ? 'Congrats, you won!' : 'Lets Play Hangman'}</h1>
        <button onClick={this.resetBoard} className="Gameboard--reset">Play again</button>
      <div className = "Gameboard">
      <Hangman />
      <div className="Gameboard--text-container">
          <div className = "Gameboard--blank-tiles" >
            {this.state.splitWord.map((l, i) => {
              return <span className = "Gameboard--single-tile"
              value = { l }
              key = {
                'board-' + l + i
              } > {
                (l !== ' ' ? '_' : ' ')
              } </span>
            })
          }
        </div>
          <div className = "AlphaButtons">
            {this.props.characters.map((c, i) => {
              return <AlphaButtons
              characters = {this.props.characters}
              value = {c}
              id = {c}
              key = {c + i}
              pressKey = {this.pressKey}
              />
            })}
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Gameboard;
