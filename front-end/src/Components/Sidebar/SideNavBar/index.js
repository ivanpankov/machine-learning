import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavItem from './NavItem';
import './styles.scss';

let key = 1;
const getKey = () => (key += 1);
export default class SideNavBar extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string
      })
    ),
    show: PropTypes.bool
  };

  static defaultProps = {
    links: [],
    show: false
  };

  render() {
    return (
      <nav className={`side-nav-bar mt-2 ${this.props.show ? 'show' : ''}`}>
        {this.props.links.map(item => (
          <NavItem {...item} key={getKey()} />
        ))}
      </nav>
    );
  }
}
