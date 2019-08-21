import React from 'react';
import PropTypes from 'prop-types';
import NavItem from './NavItem';
import './styles.scss';

let key = 1;
const getKey = () => (key += 1);
export default function SideNavBar({ links = [], show = false }) {
  return (
    <nav className={`side-nav-bar mt-2 ${show ? 'show' : ''}`}>
      {links.map(item => (
        <NavItem {...item} key={getKey()} />
      ))}
    </nav>
  );
}

SideNavBar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string
    })
  ),
  show: PropTypes.bool
};
