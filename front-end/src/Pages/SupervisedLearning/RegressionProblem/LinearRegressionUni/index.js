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
import { withMessages } from '../../../../providers/Messages';
import FontAwesomeIcon from '../../../../Components/FontAwesomeIcon';

import './styles.scss';

const ALPHA = 0.01;
const NUMBER_OF_ITERATIONS = 1500;
const INITIAL_THETA = [[0], [0]];

class LinearRegressionUni extends Component {
  state = {
    data: { status: serviceStatus.OK, error: {}, x: [], y: [] },
    theta: { status: serviceStatus.OK, error: {}, value: INITIAL_THETA, valid: true },
    hypothesis: { status: serviceStatus.OK, error: {}, value: [[]] }
  };

  async componentDidMount() {
    this.setState({
      data: { status: serviceStatus.LOADING, error: {}, x: [], y: [] }
    });

    const response = await getDataByFile('ex1data1.txt');

    if (response instanceof Error) {
      const { messages } = this.props;

      messages.addMessage({
        type: messages.ALERT_TYPES.DANGER,
        content: `ERROR ${response.status}: ${response.message}`
      });

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

  computeHypothesis = async () => {
    this.setState({
      hypothesis: { status: serviceStatus.LOADING, error: {}, value: [[]] }
    });

    let theta = this.state.theta.value;
    // parse string to number
    theta = [[+theta[0][0]], [+theta[1][0]]]
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
      theta: { status: serviceStatus.LOADING, error: {}, value: INITIAL_THETA, valid: true }
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
          value: [[response[0][0].toFixed(3)], [response[1][0].toFixed(3)]]
        }
      });
    }
  };

  onThetaChange = event => {
    const prevTheta = this.state.theta.value;
    let newTheta;
    switch (event.target.dataset.theta) {
      case 'zero':
        newTheta = [[event.target.value], prevTheta[1]];
        break;

      case 'one':
        newTheta = [prevTheta[0], [event.target.value]];
        break;

      default:
        newTheta = prevTheta;
    }

    const valid =
      !Number.isNaN(newTheta[[0][0]]) && !Number.isNaN(newTheta[[1][0]]);

    this.setState({ theta: { ...this.state.theta, value: newTheta, valid } });
  };

  render() {
    const { data } = this.state;
    const count = data.y.length;
    const theta0 = this.state.theta.value[0][0];
    const theta1 = this.state.theta.value[1][0];

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
              <DataChart data={data} hypo={this.state.hypothesis} />
            </div>
            <div className="col">
              <div>
                <MathJax.Node
                  formula={texHypothesis + '='}
                  className="d-inline-block"
                />
                <input
                  type="text"
                  value={theta0}
                  className="ml-1 formula-input"
                  size={String(theta0).length}
                  onChange={this.onThetaChange}
                  data-theta="zero"
                />
                <span className="m-1">+</span>
                <input
                  type="text"
                  value={theta1}
                  className="formula-input"
                  size={String(theta1).length}
                  onChange={this.onThetaChange}
                  data-theta="one"
                />
                <MathJax.Node formula={'x'} className="d-inline-block" />
              </div>

              <div>
                <button
                  onClick={this.computeTheta}
                  className="btn btn-outline-secondary d-block"
                >
                  <FontAwesomeIcon
                    icon="spinner"
                    className={`mr-2 ${
                      this.state.theta.status === serviceStatus.LOADING
                        ? 'fa-spin '
                        : ''
                    }`}
                  />
                  Compute thetas with Gradient Descent
                </button>

                <button
                  onClick={this.computeHypothesis}
                  className="btn btn-outline-secondary d-block mt-1"
                >
                  <FontAwesomeIcon
                    icon="spinner"
                    className={`mr-2 ${
                      this.state.hypothesis.status === serviceStatus.LOADING
                        ? 'fa-spin '
                        : ''
                    }`}
                  />
                  Compute Hypothesis
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

export default withMessages(LinearRegressionUni);
