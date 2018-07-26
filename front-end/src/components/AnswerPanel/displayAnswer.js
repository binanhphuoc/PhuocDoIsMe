import React, { Component } from 'react';
import './messageui.css';

class DisplayAnswer extends Component{

    render() {
      return(
        
        <div className="messages-wrapper">
          {!(this.props.question==='') && <div className="message to">{this.props.question}</div>}
          {!(this.props.answer==='') && <div className="message from">{this.props.answer}</div>}
        </div>
        
      );
    };
}

export default DisplayAnswer;