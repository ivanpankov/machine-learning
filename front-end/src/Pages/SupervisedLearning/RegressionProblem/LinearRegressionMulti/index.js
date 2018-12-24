import React, { PureComponent } from 'react';
import serviceStatus from '../../../../services/serviceStatus';
import { getDataByFile, normalizeFeatures } from '../../../../services/ml';
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
  texFunctionVectorTheta
} from './constants';
import MathJax from 'react-mathjax';
import ButtonSubmit from '../../../../Components/ButtonSubmit';

const INITIAL_THETA = [[0], [0], [0]];

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

  onThetaChange = () => {};

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
          <div className="col mb-3\\sum_{i=1}">
            <div>
              <MathJax.Node formula={'m ='} className="d-inline-block mr-1" />
              <span>Number of training examples</span>
            </div>
            <div>
              <MathJax.Node
                formula={'(x^{(i)}, y^{(i)}) = i^{th} '}
                className="d-inline-block mr-1 ml-1"
              />
              training example
            </div>
            <div>
              <MathJax.Node
                formula={'x^{(i)} ='}
                className="d-inline-block mr-1"
              />
              input (features) of
              <MathJax.Node
                formula={'i^{th}'}
                className="d-inline-block mr-1 ml-1"
              />
              training example
            </div>
            <div>
              <MathJax.Node formula={'n ='} className="d-inline-block mr-1" />
              <span>Number of features</span>
            </div>
            <div>
              <MathJax.Node
                formula={'x^{(i)}_j ='}
                className="d-inline-block mr-1"
              />
              value of feature
              <MathJax.Node formula={'j'} className="d-inline-block mr-1" />
              in
              <MathJax.Node
                formula={'i^{th}'}
                className="d-inline-block mr-1 ml-1"
              />
              training example
            </div>
            <div>
              <MathJax.Node
                formula={'y^{(i)} ='}
                className="d-inline-block mr-1"
              />
              output variable (target) of
              <MathJax.Node
                formula={'i^{th}'}
                className="d-inline-block mr-1 ml-1"
              />
              training example
            </div>
            <div>
              Hypothesis:
              <MathJax.Node
                formula={
                  texHypothesis +
                  '=' +
                  texHypothesisWithX0 +
                  '=' +
                  texHypothesisVectorized
                }
                className="d-inline-block mr-1 ml-1"
              />
              <em>; Where</em>
              <MathJax.Node
                formula={'x_0 = 1'}
                className="d-inline-block mr-1 ml-1"
              />
            </div>
            <div>
              Parameters:
              <MathJax.Node
                formula={'\\theta'}
                className="d-inline-block mr-1 ml-1"
              />
            </div>
            <div>
              Const Function:
              <MathJax.Node
                formula={texCostFunction}
                className="d-inline-block mr-1 ml-1"
              />
            </div>
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
            <MathJax.Node formula={texMatrixX} className="mb-3" />
            <MathJax.Node formula={texFuncMatrixX(data.x)} className="mt-3" />
          </div>
          <div className="col-4">
            <MathJax.Node formula={thetaVector} className="mb-3" />
            <MathJax.Node formula={texFunctionVectorTheta([theta0, theta1, theta2])} className="mb-3" />
          </div>
          <div className="col-4">
            <MathJax.Node formula={texVectorY} className="mb-3"/>
            <MathJax.Node formula={texFunctionVectorY(data.y)} className="mb-3"/>
          </div>
        </div>

        <div className="row">
          <div className="col text-center mt-3 mb-3">
            <h2>Feature scaling</h2>
            <span>Mean value: </span>
            <MathJax.Node formula={texMean} className="d-inline-block" />
            <br />
            <span>Standard deviation</span>
            <MathJax.Node
              formula={texStandardDeviation}
              className="d-inline-block"
            />
            <div>
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
            <div>
              <MathJax.Node
                formula={texHypothesis + '='}
                className="d-inline-block"
              />
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
              <MathJax.Node formula={'x_1'} className="d-inline-block" />
              <span className="m-1">+</span>
              <input
                type="text"
                value={theta2}
                className="formula-input"
                size={String(theta2).length || 1}
                onChange={this.onThetaChange}
                data-theta="two"
              />
              <MathJax.Node formula={'x_2'} className="d-inline-block" />
            </div>

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
