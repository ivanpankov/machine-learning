import React, { Component } from 'react';
import PropTypes from 'prop-types';

let key = 1;
const getKey = () => (key += 1);

export default class Grid extends Component {
  static propTypes = {
    headerNames: PropTypes.arrayOf(PropTypes.node),
    rows: PropTypes.arrayOf(PropTypes.array),
    className: PropTypes.string,
    caption: PropTypes.node
  };

  static defaultProps = {
    headerNames: [],
    rows: [],
    className: '',
    caption: null
  };

  render() {
    return (
      <table className={`table .table-sm ${this.props.className}`}>
        {this.props.caption ? <caption>{this.props.caption}</caption> : null}
        <thead>
          <tr>
            {this.props.headerNames.map(item => (
              <th key={getKey()}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.rows.map(row => (
            <tr key={getKey()}>
              {row.map(col => (
                <td key={getKey()}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
