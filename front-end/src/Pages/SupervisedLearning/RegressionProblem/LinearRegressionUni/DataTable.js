import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax2';

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
        <td>
          <MathJax.Node inline>{`x^{(${this.props.index})} =`}</MathJax.Node>
          <span className="ml-1">{this.props.x[0]}</span>
        </td>
        <td>
          <MathJax.Node inline>{`y^{(${this.props.index})} = `}</MathJax.Node>
          <span className="ml-1">{this.props.y[0]}</span>
        </td>
      </tr>
    );
  }
}

export default class DataTable extends PureComponent {
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
    const { x, y } = this.props;
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">(X) Population of City in 10,000s</th>
            <th scope="col">(Y) Profit in $10,000s</th>
          </tr>
        </thead>
        <tbody>
          {x.slice(0, 5).map((xi, i) => (
            <Row key={i} x={xi} y={y[i]} index={i} />
          ))}
          <tr key="dots" className="text-center">
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
