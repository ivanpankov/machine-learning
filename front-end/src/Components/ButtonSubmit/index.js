import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '../../Components/FontAwesomeIcon';
import { noop } from '../../lib/utils';

import './styles.scss';

export default function ButtonSubmit({
  spin = false,
  className = '',
  onClick = noop,
  children = null,
  disabled = false
}) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-primary btn-sm pr-3 ${className}`}
      disabled={disabled || spin}
    >
      <FontAwesomeIcon icon="spinner" className={`${spin ? 'fa-spin ' : ''}`} />
      {children}
    </button>
  );
}

ButtonSubmit.propTypes = {
  spin: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool
};
