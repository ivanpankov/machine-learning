import React, { PureComponent } from 'react';
import serviceStatus from '../../../../services/serviceStatus';
import { getDataByFile, normalizeFeatures, gradientDescentMulti } from '../../../../services/ml';
import DataTable from './DataTable';
import { withMessages } from '../../../../providers/Messages';
import {
  texMean,
  texStandardDeviation,
  texHypothesis,
  texHypothesisWithX0,
  texHypothesisVectorized,
  texMatrixX,
  texFuncMatrixX,
  thetaVector,
  texCostFunction,
  texVectorY,
  texFunctionVectorY,
  texFunctionVectorTheta,
  texNormalizedValue
} from './constants';
import MathJax from 'react-mathjax2';
import ButtonSubmit from '../../../../Components/ButtonSubmit';

const ALPHA = 0.01;
const NUMBER_OF_ITERATIONS = 1500;
const INITIAL_THETA = [[0], [0], [0]];
const regIsDigit = new RegExp(/^-?\d*(\.\d+)?$/);

class LinearRegressionMulti extends PureComponent {
  state = {
    data: { status: serviceStatus.OK, error: {}, x: [[]], y: [] },
    dataNorm: { status: serviceStatus.OK, error: {}, x: [[]], y: [] },
    isDataNormalized: false,
    theta: {
      status: serviceStatus.OK,
      error: {},
      value: INITIAL_THETA,
      valid: true
    }
  };

  async componentDidMount() {
    this.setState({
      data: { status: serviceStatus.LOADING, error: {}, x: [[]], y: [] }
    });

    const response = await getDataByFile('ex1data2.txt', 3);

    if (response instanceof Error) {
      const { messages } = this.props;

      messages.addMessage({
        type: messages.ALERT_TYPES.DANGER,
        content: `ERROR ${response.status}: ${response.message}`
      });

      this.setState({
        data: { status: serviceStatus.ERROR, error: response, x: [[]], y: [] }
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

  normalizeFeatures = async () => {
    this.setState({
      dataNorm: { status: serviceStatus.LOADING, error: {}, x: [[]], y: [] }
    });

    const response = await normalizeFeatures(this.state.data.x);

    if (response instanceof Error) {
      const { messages } = this.props;

      messages.addMessage({
        type: messages.ALERT_TYPES.DANGER,
        content: `ERROR ${response.status}: ${response.message}`
      });

      this.setState({
        dataNorm: {
          status: serviceStatus.ERROR,
          error: response,
          x: [[]],
          y: []
        },
        isDataNormalized: false
      });
    } else {
      this.setState({
        dataNorm: {
          status: serviceStatus.OK,
          error: {},
          x: response,
          y: this.state.data.y
        },
        isDataNormalized: true
      });
    }
  };

  isThetaValid = theta => {
    const theta0 = String(theta[0][0]);
    const theta1 = String(theta[1][0]);
    const theta2 = String(theta[2][0]);

    return (
      theta0.length &&
      theta1.length &&
      theta2.length &&
      regIsDigit.test(theta0) &&
      regIsDigit.test(theta1) &&
      regIsDigit.test(theta2)
    );
  };

  onThetaChange = event => {
    const prevTheta = this.state.theta.value;
    let newTheta;
    switch (event.target.dataset.theta) {
      case 'zero':
        newTheta = [[event.target.value], prevTheta[1], prevTheta[2]];
        break;

      case 'one':
        newTheta = [prevTheta[0], [event.target.value], prevTheta[2]];
        break;

      case 'two':
        newTheta = [prevTheta[0], prevTheta[1], [event.target.value]];
        break;

      default:
        newTheta = prevTheta;
    }

    this.setState({
      theta: {
        ...this.state.theta,
        value: newTheta,
        valid: this.isThetaValid(newTheta)
      }
    });
  };

  computeTheta = async () => {
    this.setState({
      theta: {
        status: serviceStatus.LOADING,
        error: {},
        value: INITIAL_THETA,
        valid: true
      }
    });

    const { x, y } = this.state.data;
    const response = await gradientDescentMulti(
      x,
      y,
      INITIAL_THETA,
      ALPHA,
      NUMBER_OF_ITERATIONS
    );

    console.log(response);

    if (response instanceof Error) {
      this.setState({
        theta: {
          status: serviceStatus.ERROR,
          error: response,
          value: INITIAL_THETA,
          valid: false
        }
      });
    } else {
      this.setState({
        theta: {
          status: serviceStatus.OK,
          error: {},
          // value: [[response[0][0].toFixed(3)], [response[1][0].toFixed(3)], [response[2][0].toFixed(3)]],
          value: [[0],[0],[0]],
          valid: true
        }
      });
    }
  };

  render() {
    const { data, dataNorm, isDataNormalized } = this.state;
    const theta0 = this.state.theta.value[0][0];
    const theta1 = this.state.theta.value[1][0];
    const theta2 = this.state.theta.value[2][0];

    return (
      <div className="container">
        <div className="row">
          <div className="col pb-3">
            <h1>Linear regression with multiple variables</h1>
            <p>
              <strong>Multivariate linear regression</strong>
            </p>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col mb-3">
            <p>
              <MathJax.Node inline>{'m ='}</MathJax.Node>
              <span className="ml-1">Number of training examples</span>
            </p>
            <p>
              <MathJax.Node inline>
                {'(x^{(i)}, y^{(i)}) = i^{th}'}
              </MathJax.Node>
              <span className="ml-1">training example</span>
            </p>
            <p>
              <MathJax.Node inline>{'x^{(i)} ='}</MathJax.Node>
              <span className="ml-1 mr-1">input (features) of</span>
              <MathJax.Node inline>{'i^{th}'}</MathJax.Node>
              <span className="ml-1">training example</span>
            </p>
            <p>
              <MathJax.Node inline>{'n ='}</MathJax.Node>
              <span className="ml-1">Number of features</span>
            </p>
            <p>
              <MathJax.Node inline>{'x^{(i)}_j ='}</MathJax.Node>
              <span className="ml-1 mr-1">value of feature</span>
              <MathJax.Node inline>{'j'}</MathJax.Node>
              <span className="ml-1 mr-1">in</span>
              <MathJax.Node inline>{'i^{th}'}</MathJax.Node>
              <span className="ml-1">training example</span>
            </p>
            <p>
              <MathJax.Node inline>{'y^{(i)} ='}</MathJax.Node>
              <span className="ml-1 mr-1">output variable (target) of</span>
              <MathJax.Node inline>{'i^{th}'}</MathJax.Node>
              <span className="ml-1">training example</span>
            </p>
            <p>
              <span className="mr-3">Hypothesis:</span>
              <MathJax.Node
                inline
              >{`${texHypothesis} = ${texHypothesisWithX0} = ${texHypothesisVectorized}`}</MathJax.Node>
              <em className="ml-2 mr-1">; Where</em>
              <MathJax.Node inline>{'x_0 = 1'}</MathJax.Node>
            </p>
            <p>
              <span className="mr-3">Parameters:</span>
              <MathJax.Node inline>{'\\theta'}</MathJax.Node>
            </p>
            <p>
              <span className="mr-3">Const Function:</span>
              <MathJax.Node inline>{texCostFunction}</MathJax.Node>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col mt-3 mb-3 text-center">
            <h4>Housing prices in Portland, Oregon.</h4>
            <DataTable {...data} />
          </div>
        </div>

        <div className="row">
          <div className="col text-center mt-3">
            <h2>Data representation</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <MathJax.Node>{texMatrixX}</MathJax.Node>
          </div>
          <div className="col-4">
            <MathJax.Node>{thetaVector}</MathJax.Node>
          </div>
          <div className="col-4">
            <MathJax.Node>{texVectorY}</MathJax.Node>
          </div>
        </div>

        {data.x.length ? (
          <div className="row">
            <div className="col-4">
              <MathJax.Node>{texFuncMatrixX(data.x)}</MathJax.Node>
            </div>
            <div className="col-4">
              <MathJax.Node>
                {texFunctionVectorTheta([theta0, theta1, theta2])}
              </MathJax.Node>
            </div>
            <div className="col-4">
              <MathJax.Node>{texFunctionVectorY(data.y)}</MathJax.Node>
            </div>
          </div>
        ) : null}

        <div className="row">
          <div className="col mt-3 mb-3">
            <h2 className="text-center mb-3">Feature scaling</h2>
            <p>
              <span className="mr-3">Mean value: </span>
              <MathJax.Node inline>{texMean}</MathJax.Node>
            </p>
            <p>
              <span className="mr-3">Simple standard deviation:</span>
              <MathJax.Node inline>{texStandardDeviation}</MathJax.Node>
            </p>
            <p>
              <span className="mr-3">Normalized value:</span>
              <MathJax.Node inline>{texNormalizedValue}</MathJax.Node>
            </p>
            <div className="text-center">
              <ButtonSubmit
                onClick={this.normalizeFeatures}
                spin={this.state.dataNorm.status === serviceStatus.LOADING}
              >
                Normalize Features
              </ButtonSubmit>
            </div>
          </div>
        </div>

        {isDataNormalized ? (
          <div className="row">
            <div className="col mt-3">
              <h3 className="d-inline">Normalized data</h3>
              <DataTable {...dataNorm} />
            </div>
          </div>
        ) : null}

        <div className="row">
          <div className="col text-center mt-3 mb-3">
            <h2>Hypothesis</h2>
            <p>
              <MathJax.Node inline>{texHypothesis + '='}</MathJax.Node>
              <input
                type="text"
                value={theta0}
                className="ml-1 formula-input"
                size={String(theta0).length || 1}
                onChange={this.onThetaChange}
                data-theta="zero"
              />
              <span className="m-1">+</span>
              <input
                type="text"
                value={theta1}
                className="formula-input"
                size={String(theta1).length || 1}
                onChange={this.onThetaChange}
                data-theta="one"
              />
              <MathJax.Node inline>{'x_1'}</MathJax.Node>
              <span className="m-1">+</span>
              <input
                type="text"
                value={theta2}
                className="formula-input"
                size={String(theta2).length || 1}
                onChange={this.onThetaChange}
                data-theta="two"
              />
              <MathJax.Node inline>{'x_2'}</MathJax.Node>
            </p>

            <div>
              <ButtonSubmit
                onClick={this.computeTheta}
                className="d-inline-block"
                spin={this.state.theta.status === serviceStatus.LOADING}
              >
                Compute thetas with Gradient Descent
              </ButtonSubmit>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withMessages(LinearRegressionMulti);
