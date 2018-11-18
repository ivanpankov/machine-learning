import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

let key = 1;
const getKey = () => (key += 1);

const NavItem = ({ name = '', link = '', subLinks = [] }) => {
  return (
    <div className="side-nav-bar-item">
      <NavLink
        to={link}
        className="text-secondary nav-link p-1"
        activeClassName="text-dark"
      >
        {name}
      </NavLink>
      <div className="sub-links ml-2">
        {subLinks.map(item => (
          <NavItem {...item} key={getKey()} />
        ))}
      </div>
    </div>
  );
};

NavItem.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
};

export default NavItem;
