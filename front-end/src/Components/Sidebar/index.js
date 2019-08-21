import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import SideNavBar from './SideNavBar';

export default function Sidebar({ links = [], className = '' }) {
  const [showNavBar, setShowNavBar] = useState(false);

  const toggleNavBar = event => {
    event.preventDefault();
    setShowNavBar(!showNavBar);
  };

  return (
    <div id="sidebar" className={className}>
      <form className="d-flex align-items-center">
        <input
          type="search"
          className="form-control ds-input d-inline"
          id="search-input"
          placeholder="Search..."
          autoComplete="off"
        />
        <button className="btn navbar-toggler d-lg-none" onClick={toggleNavBar}>
          <Icon icon="bars" />
        </button>
      </form>
      <SideNavBar links={links} show={showNavBar} />
    </div>
  );
}

Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string
    })
  ),
  className: PropTypes.string
};
