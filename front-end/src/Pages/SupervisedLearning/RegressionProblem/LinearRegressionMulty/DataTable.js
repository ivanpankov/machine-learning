import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Row extends PureComponent {
  static propTypes = {
    x: PropTypes.array,
    y: PropTypes.array
  };

  static defaultProps = {
    x: [0],
    y: [0]
  };

  render() {
    return (
      <tr>
        <td>{this.props.x[0]}</td>
        <td>{this.props.x[1]}</td>
        <td>{this.props.y[0]}</td>
      </tr>
    );
  }
}

export default class DataTable extends PureComponent {
  static propTypes = {
    x: PropTypes.array,
    y: PropTypes.array
  };

  static defaultProps = {
    x: [],
    y: []
  };

  render() {
    const { x, y } = this.props;
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">(X<sub>1</sub>) Size of house in feet<sup>2</sup></th>
            <th scope="col">(X<sub>2</sub>) Number of bedrooms</th>
            <th scope="col">(Y) price of the house</th>
          </tr>
        </thead>
        <tbody>
          {x.slice(0, 5).map((xi, i) => (
            <Row key={i} x={xi} y={y[i]} />
          ))}
          <Row key="last" x={['...', '...']} y={['...']} />
        </tbody>
      </table>
    );
  }
}
