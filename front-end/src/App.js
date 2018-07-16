import React, { Component } from 'react';
import logo from './logo.svg';
import Navbar from './components/Navbar.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Navbar />
        <form class="form-inline justify-content-center" action="/questionpd/ask" method="POST">
          <div class="form-group">
            <label class="mr-sm-2">
              Question:
              <input type="text" class="form-control mb-2 mr-sm-2" name="question" />
            </label>
          </div>
          <input class="btn btn-primary mb-2" type="submit" value="Submit"/>
        </form>
      </div>
      
    );
  }
}

export default App;
