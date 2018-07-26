import React, { Component } from 'react';
import './navbar.css';
import logo from './Picture1.png';

class Navbar extends Component {

  render() {

    return (

      <nav class="navbar navbar-expand-lg bg-opacity fixed-top">
        <a class="navbar-brand" href="#">
          <img src={logo} className="animate-size"/>
        </a>
          <ul class="navbar-nav nav-ul">
            <li class="nav-li nav-item active">
              <a class="nav-a nav-link" href="/">About <span class="sr-only">(current)</span></a>
            </li>

            <li class="nav-li nav-item active">
              <a class="nav-a nav-link" href="/questionpd/ask">Ask me <span class="sr-only">(current)</span></a>
            </li>

            <li class="nav-li nav-item active">
              <a class="nav-a nav-link" href="/questionpd/retrieve">Retrieve answer<span class="sr-only">(current)</span></a>
            </li>

            <li class="nav-li nav-item active">
              <a class="nav-a nav-link" href="#">Contact<span class="sr-only">(current)</span></a>
            </li>
          </ul>
      </nav>
    );
  }
}

export default Navbar;
