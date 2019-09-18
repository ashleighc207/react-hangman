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
        <button className="AlphaButtons--button"
        id={this.props.id}
        value={this.props.value} onClick={this.handleClick}>{this.props.value}</button>
    )
  }
}

export default AlphaButtons;
