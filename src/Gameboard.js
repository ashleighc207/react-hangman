import React, { Component } from 'react';
import './Gameboard.css';
import Hangman from './Hangman.js';
import AlphaButtons from './AlphaButtons.js';

class Gameboard extends Component {
  static defaultProps = {
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    mysteryWord: 'New Car',
    bodyParts: ['head', 'body', 'arm-r', 'arm-l', 'leg-r', 'leg-l']
  }
  state = {
    currentWord: this.props.mysteryWord,
    splitWord: this.props.mysteryWord.toLowerCase().split(''),
    bodyParts: this.props.bodyParts
  }

  constructor(props){
    super(props);
    this.pressKey = this.pressKey.bind(this);
  }

  pressKey(key){
    let tiles = document.getElementsByClassName('Gameboard--single-tile');
    for(let i = 0; i < tiles.length; i++){
      if(tiles[i].getAttribute('value') === key){
        tiles[i].innerText = key;
      } else {
        if(this.state.bodyParts.length <= 0){
          let buttons = document.getElementsByTagName('button');
          for(let i = 0; i < buttons.length; i++){
            buttons[i].setAttribute('disabled', true)
          }
        } else {
          document.getElementById(this.state.bodyParts[0]).style.opacity = 1;
          let newBody = this.state.bodyParts.filter((n, i) => {
            return (i != 0) ? n : null;
          })
          this.setState({
            bodyParts: newBody
          })
        }
      }
      }
  }


  render(){
    return(
      <div className="Gameboard">
        <Hangman />
        <div className="Gameboard--blank-tiles">
          {this.state.splitWord.map(l => {
            return <span className="Gameboard--single-tile" value={l} key={'board-' + l}>{(l != ' ' ? '_' : ' ')}</span>
          })}
        </div>
        <div className="AlphaButtons">
          {this.props.characters.map(c => {
            return <AlphaButtons
              characters={this.props.characters}
              value={c}
              key={c}
              pressKey={this.pressKey}
            />
          })}
        </div>
      </div>
    )
  }
}

export default Gameboard;
