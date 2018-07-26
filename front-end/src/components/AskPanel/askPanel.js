import React, { Component } from 'react';
import Askbox from './askbox';
import './askPanel.css';

class AskPanel extends Component {

  render() {

    return (
        <div className="div-bg bg1">
          <Askbox/>
        </div>
    );
  }
}

export default AskPanel;