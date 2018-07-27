import React, { Component } from 'react';
import './navbar.css';
import logo from './Picture1.png';

class Navbar extends Component {

  render() {

    return (

      <nav className="navbar navbar-expand-lg bg-opacity fixed-top">
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
    );
  }
}

export default Navbar;
