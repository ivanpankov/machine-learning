import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax';
import Plot from 'react-plotly.js';
import { getHousingPrices } from '../../../../services/housingPrices';
import serviceStatus from '../../../../services/serviceStatus';
import {
  texHypothesis,
  texParameters,
  texCostFunction,
  texGoal,
  chartLayout
} from './constants';

class Row extends Component {
  static propTypes = {
    row: PropTypes.array
  };

  static defaultProps = {
    row: ['', '']
  };

  render() {
    return (
      <tr>
        <td>{this.props.row[0]}</td>
        <td>{this.props.row[1]}</td>
      </tr>
    );
  }
}

export default class LinearRegressionUni extends Component {
  state = {
    housingPrices: { rows: [], status: serviceStatus.OK },
    chart: [
      {
        x: [],
        y: [],
        type: 'scatter',
        mode: 'markers',
        marker: { color: 'red' }
      }
    ],
    x: [],
    y: []
  };

  async componentDidMount() {
    this.setState({
      housingPrices: { rows: [], status: serviceStatus.LOADING }
    });

    const response = await getHousingPrices();

    if (response) {
      const x = response.map(row => row[0]); // input features
      const y = response.map(row => row[1]); // output

      this.setState({
        housingPrices: {
          rows: response,
          status: serviceStatus.OK
        },
        x,
        y,
        chart: [
          {
            x,
            y,
            type: 'scatter',
            mode: 'markers',
            marker: { color: 'red' }
          }
        ]
      });
    } else {
      this.setState({
        housingPrices: {
          rows: [[[<h3>Error loading data!</h3>]]],
          status: serviceStatus.ERROR
        }
      });
    }
  }

  render() {
    const { rows } = this.state.housingPrices;
    const count = rows.length;
    console.log(rows);
    return (
      <MathJax.Provider>
        <div className="container">
          <div className="row">
            <div className="col pb-3">
              <h1>Linear regression</h1>
              <p>
                <strong>Univariable linear regression</strong>
              </p>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col pb-3">
              <p>
                <strong>m</strong>
                {` = ${count} = Number of training examples`}
              </p>
              <p>
                <strong>x</strong>`s{` = input variable (features)`}
              </p>
              <p>
                <strong>y</strong>`s{` = output variable (target)`}
              </p>
              <p>
                (x<sup>(i)</sup>, y<sup>(i)</sup>) -{' '}
                <strong>
                  i<sup>th</sup>
                </strong>{' '}
                training example
              </p>

              <div>
                <span>Hypothesis:</span>
                <MathJax.Node
                  formula={texHypothesis}
                  className="d-inline-block pl-3"
                />
              </div>
              <div>
                <span>Paramaters:</span>
                <MathJax.Node
                  formula={texParameters}
                  className="d-inline-block pl-3"
                />
              </div>
              <div>
                <span>Cost Function:</span>
                <MathJax.Node
                  formula={texCostFunction}
                  className="d-inline-block pl-3"
                />
              </div>
              <div>
                <span>Goal:</span>
                <MathJax.Node
                  formula={texGoal}
                  className="d-inline-block pl-3"
                  style={{ position: 'relative', top: '12px' }}
                />
              </div>
            </div>
            <div className="col">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">(X) Population of City in 10,000s</th>
                    <th scope="col">(Y) Profit in $10,000s</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 5).map((row, i) => (
                    <Row key={i} row={row} />
                  ))}
                  <Row row={['...', '...']} />
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Plot data={this.state.chart} layout={chartLayout} />
            </div>
          </div>
        </div>
      </MathJax.Provider>
    );
  }
}
