import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export const ALERT_TYPES = {
  PRIMARY: 'alert-primary',
  SECONDARY: 'alert-secondary',
  SUCCESS: 'alert-success',
  DANGER: 'alert-danger',
  WARNING: 'alert-warning',
  INFO: 'alert-info',
  LIGHT: 'alert-light',
  DARK: 'alert-dark'
};

export const ALERT_TYPES_AS_ARRAY = Object.values(ALERT_TYPES);

export default class Alert extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.oneOf(ALERT_TYPES_AS_ARRAY)
  };

  static defaultProps = {
    className: '',
    children: null,
    type: ALERT_TYPES.PRIMARY
  };

  render() {
    return (
      <div className={`alert ${this.props.type} ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}
