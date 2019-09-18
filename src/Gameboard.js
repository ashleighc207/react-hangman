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
    bodyParts: ['head', 'body', 'arm-l', 'arm-r', 'leg-l', 'leg-r']
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
  }

  pressKey(key) {
    document.getElementById(key).setAttribute('disabled', true)
    let tiles = document.getElementsByClassName('Gameboard--single-tile');
    let tilesArr = [];
    console.log(tiles)
    for (let i = 0; i < tiles.length; i++) {
      tilesArr.push(tiles[i]);
    }
    if (tilesArr.some(t => { return t.getAttribute('value') === key})) {
    let idx = tilesArr.findIndex(function(t, i){
      return t.getAttribute('value') === key
      })
      tilesArr[idx].innerText = key;
    } else {
      if (this.state.bodyParts.length > 0) {
        document.getElementById(this.state.bodyParts[0]).style.opacity = 1;
        let newBody = this.state.bodyParts.filter((n, i) => {
          return (i != 0) ? n : null;
        })
        this.setState({
          bodyParts: newBody
        })
        if (this.state.bodyParts.length == 1) {
          let buttons = document.getElementsByTagName('button');
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('disabled', true)
          }
          this.setState({
            status: 'lost'
          })
        }
      }
    }
  }


  render() {
    return (
      <div>
        <h1 className="Gameboard--title">{this.state.status === 'lost' ? 'Better Luck Next Time!' : this.state.status === 'won' ? 'Congrats, you won!' : 'Lets Play Hangman'}</h1>
      <div className = "Gameboard">
      <Hangman />
      <div className="Gameboard--text-container">
          <div className = "Gameboard--blank-tiles" >
            {this.state.splitWord.map(l => {
              return <span className = "Gameboard--single-tile"
              value = { l }
              key = {
                'board-' + l
              } > {
                (l != ' ' ? '_' : ' ')
              } </span>
            })
          }
        </div>
          <div className = "AlphaButtons">
            {this.props.characters.map(c => {
              return <AlphaButtons
              characters = {this.props.characters}
              value = {c}
              id = {c}
              key = {c}
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
