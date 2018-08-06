import React, { Component } from 'react';
import './navbar.css';
import logo from './Picture1.png';

class Navbar extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      navClass: 'show'
    }
  }

  render() {

    return (
      <div>
      
      <nav className={"navbar navbar-expand-lg bg-opacity fixed-top "+this.state.navClass}
      onMouseEnter={() => {
        this.setState({navClass:'show'});
      }}
      onMouseLeave={() => {
        this.setState({navClass:'hidden'});
      }}>
        <a className="navbar-brand" href="#">
          <img src={logo} className="animate-size"/>
        </a>
          <ul className="navbar-nav nav-ul">
            <li className="nav-li nav-item active">
              <a className="nav-a nav-link" href="/">About <span className="sr-only">(current)</span></a>
            </li>

            <li className="nav-li nav-item active">
              <a className="nav-a nav-link" href="/questionpd/ask">Ask me <span className="sr-only">(current)</span></a>
            </li>

            <li className="nav-li nav-item active">
              <a className="nav-a nav-link" href="/questionpd/retrieve">Retrieve answer<span className="sr-only">(current)</span></a>
            </li>

            <li className="nav-li nav-item active">
              <a className="nav-a nav-link" href="#">Contact<span className="sr-only">(current)</span></a>
            </li>
          </ul>
      </nav>

      <div style={{zIndex:5,position:"fixed", top:0, height:100+"px", width:100+"vw"}}
      onMouseEnter={() => {
        this.setState({navClass:'show'});
      }}
      onMouseLeave={() => {
        this.setState({navClass:'hidden'});
      }}/>
      </div>
    );
  }
}

export default Navbar;
