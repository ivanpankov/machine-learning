import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import MathJax from 'react-mathjax';
import { gradientDescentUni, hypothesis } from '../../../../services/ml';
import serviceStatus from '../../../../services/serviceStatus';
import {
  texHypothesis,
  texParameters,
  texCostFunction,
  texGoal
} from './constants';
import { getDataByFile } from '../../../../services/ml';
import DataTable from './DataTable';
import DataChart from './DataChart';

import './styles.scss';

const ALPHA = 0.01;
const NUMBER_OF_ITERATIONS = 1500;
const INITIAL_THETA = [[0], [0]];

export default class LinearRegressionUni extends Component {
  state = {
    data: { status: serviceStatus.OK, error: {}, x: [], y: [] },
    theta: { status: serviceStatus.OK, error: {}, value: INITIAL_THETA },
    hypothesis: { status: serviceStatus.LOADING, error: {}, value: [[]] }
  };

  async componentDidMount() {
    this.setState({
      data: { status: serviceStatus.LOADING, error: {}, x: [], y: [] }
    });

    const response = await getDataByFile('ex1data1.txt');

    if (response instanceof Error) {
      this.setState({
        data: { status: serviceStatus.ERROR, error: response, x: [], y: [] }
      });
    } else {
      this.setState({
        data: {
          status: serviceStatus.OK,
          error: {},
          x: response.x,
          y: response.y
        }
      });
    }
  }

  computeHypothesis = async theta => {
    this.setState({
      hypothesis: { status: serviceStatus.LOADING, error: {}, value: [[]] }
    });

    const { x } = this.state.data;
    const response = await hypothesis(x, theta);

    if (response instanceof Error) {
      this.setState({
        hypothesis: {
          status: serviceStatus.ERROR,
          error: response,
          value: 'error'
        }
      });
    } else {
      this.setState({
        hypothesis: {
          status: serviceStatus.OK,
          error: {},
          value: response
        }
      });
    }
  };

  computeTheta = async () => {
    this.setState({
      theta: { status: serviceStatus.LOADING, error: {}, value: INITIAL_THETA }
    });

    const { x, y } = this.state.data;
    const response = await gradientDescentUni(
      x,
      y,
      INITIAL_THETA,
      ALPHA,
      NUMBER_OF_ITERATIONS
    );

    if (response instanceof Error) {
      this.setState({
        theta: {
          status: serviceStatus.ERROR,
          error: response,
          value: INITIAL_THETA
        }
      });
    } else {
      this.setState({
        theta: {
          status: serviceStatus.OK,
          error: {},
          value: response
        }
      });

      this.computeHypothesis(response);
    }
  };

  render() {
    const { data } = this.state;
    const count = data.y.length;
    const theta0 = this.state.theta.value[0][0].toFixed(3);
    const theta1 = this.state.theta.value[1][0].toFixed(3);
    const hypoFormula = `${texHypothesis} = ${theta0} + ${theta1}x`;

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
                  style={{ position: 'relative', top: '10px' }}
                />
              </div>
            </div>
            <div className="col">
              <DataTable {...data} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <DataChart data={data} hypo={this.state.hypothesis}/>
            </div>
            <div className="col">
              <div>
                {this.state.theta.status === serviceStatus.OK ? (
                  <MathJax.Node
                    formula={hypoFormula}
                    className="d-inline-block"
                  />
                ) : (
                  <span>Calculating ...</span>
                )}
              </div>

              <div>
                <button onClick={this.computeTheta}>
                  Compute thetas with Gradient Descent
                </button>
              </div>
            </div>
          </div>
          <div className="row">next</div>
        </div>
      </MathJax.Provider>
    );
  }
}
