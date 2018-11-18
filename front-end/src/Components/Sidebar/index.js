import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import SideNavBar from "./SideNavBar";

export default class Sidebar extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string
      })
    ),
    className: PropTypes.string
  };

  static defaultProps = {
    links: [],
    className: ''
  };

  state = { showNavBar: false };

  toggleNavBar = (event) => {
    event.preventDefault();
    this.setState({ showNavBar: !this.state.showNavBar });
  };

  render() {
    return (
      <div id="sidebar" className={this.props.className}>
        <form className="d-flex align-items-center">
          <input
            type="search"
            className="form-control ds-input d-inline"
            id="search-input"
            placeholder="Search..."
            autoComplete="off"
          />
          <button
            className="btn navbar-toggler d-lg-none"
            onClick={this.toggleNavBar}
          >
            <Icon icon="bars" />
          </button>
        </form>
        <SideNavBar links={this.props.links} show={this.state.showNavBar}/>
      </div>
    );
  }
}
