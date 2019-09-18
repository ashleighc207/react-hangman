import React, { Component } from 'react';
import './AlphaButtons.css'

class AlphaButtons extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    this.props.pressKey(this.props.value)
  }
  render(){
    return(
        <button onClick={this.handleClick}>{this.props.value}</button>
    )
  }
}

export default AlphaButtons;
