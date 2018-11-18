import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            Machine learning
          </Link>
        </nav>
      </header>
    );
  }
}