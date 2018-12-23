import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '../../Components/FontAwesomeIcon';
import { noop } from '../../lib/utils';

import './styles.scss';

export default class ButtonSubmit extends Component {
  static propTypes = {
    spin: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    spin: false,
    className: '',
    onClick: noop,
    children: null,
    disabled: false
  };

  render() {
    return (
      <button
        onClick={this.props.onClick}
        className={`btn btn-primary btn-sm pr-3 ${this.props.className}`}
        disabled={this.props.disabled || this.props.spin}
      >
        <FontAwesomeIcon
          icon="spinner"
          className={`${this.props.spin ? 'fa-spin ' : ''}`}
        />
        {this.props.children}
      </button>
    );
  }
}
