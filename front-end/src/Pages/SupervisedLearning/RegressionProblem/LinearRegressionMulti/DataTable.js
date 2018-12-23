import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax';

class Row extends PureComponent {
  static propTypes = {
    x: PropTypes.array,
    y: PropTypes.array,
    index: PropTypes.number
  };

  static defaultProps = {
    x: [0],
    y: [0],
    index: 0
  };

  render() {
    return (
      <tr>
        <td>
          <MathJax.Node
            formula={`x^{(${this.props.index})}_1 = `}
            className="d-inline-block mr-1"
          />
          {this.props.x[0]}
        </td>
        <td>
          <MathJax.Node
            formula={`x^{(${this.props.index})}_2 = `}
            className="d-inline-block mr-1"
          />
          {this.props.x[1]}
        </td>
        <td>
          <MathJax.Node
            formula={`y^{(${this.props.index})} = `}
            className="d-inline-block mr-1"
          />
          {this.props.y[0]}
        </td>
      </tr>
    );
  }
}

export default class DataTable extends PureComponent {
  static propTypes = {
    x: PropTypes.array,
    y: PropTypes.array,
    className: PropTypes.string
  };

  static defaultProps = {
    x: [],
    y: [],
    className: ''
  };

  render() {
    const { x, y } = this.props;
    return (
      <table className={`table table-bordered ${this.props.className}`}>
        <thead>
          <tr>
            <th scope="col">
              (X<sub>1</sub>) Size of house in feet<sup>2</sup>
            </th>
            <th scope="col">
              (X<sub>2</sub>) Number of bedrooms
            </th>
            <th scope="col">(Y) price of the house</th>
          </tr>
        </thead>
        <tbody>
          {x.slice(0, 5).map((xi, i) => (
            <Row key={i} x={xi} y={y[i]} index={i} />
          ))}
          <tr key="dots" className="text-center">
            <td>...</td>
            <td>...</td>
            <td>...</td>
          </tr>
          <Row
            key="last"
            x={x[x.length - 1]}
            y={y[y.length - 1]}
            index={y.length}
          />
        </tbody>
      </table>
    );
  }
}
