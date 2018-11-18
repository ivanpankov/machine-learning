import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PageLinks extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  render () {
    return (
      <div className={this.props.className}>
        <ul>
          <li>;oserijpei</li>
          <li>;oserijpei</li>
          <li>;oserijpei</li>
          <li>;oserijpei</li>
          <li>;oserijpei</li>
        </ul>
      </div>
    );
  }
}