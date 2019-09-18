import React, { Component } from 'react';
import './Gameboard.css';
import Hangman from './Hangman.js';
import AlphaButtons from './AlphaButtons.js';

class Gameboard extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <Hangman />
        <AlphaButtons />
      </div>
    )
  }
}

export default Gameboard;
