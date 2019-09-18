import React, { Component } from 'react';
import './Hangman.css'

class Hangman extends Component {
  render(){
    return(
      <div className="Hangman">
        <svg className="Hangman--man-container" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle id="head" cx="45" cy="20" r="10" fill="#FFFFFF" stroke="#212121" />
          <line id="body" x1="45" y1="30" x2="45" y2="80" stroke="#212121" />
          <line id="arm-r" x1="45" y1="45" x2="60" y2="65" stroke="#212121" />
          <line id="arm-l" x1="45" y1="45" x2="30" y2="65" stroke="#212121" />
          <line id="leg-r" x1="45" y1="80" x2="55" y2="100" stroke="#212121" />
          <line id="leg-l" x1="45" y1="80" x2="35" y2="100" stroke="#212121" />
        </svg>
      </div>
    )
  }
}

export default Hangman;
