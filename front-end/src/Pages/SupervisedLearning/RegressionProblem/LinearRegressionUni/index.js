import React, { useState, useEffect } from 'react';
import MathJax from 'react-mathjax2';
import {
  gradientDescentUni,
  hypothesis as hypothesisService,
  constFunctionSurface as constFunctionSurfaceService
} from '../../../../services/ml';
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
import SurfaceChart from './SurfaceChart';
import { withMessages } from '../../../../providers/Messages';
import ButtonSubmit from '../../../../Components/ButtonSubmit';

import './styles.scss';

const ALPHA = 0.01;
const NUMBER_OF_ITERATIONS = 1500;
const INITIAL_THETA = [[0], [0]];
const regIsDigit = new RegExp(/^-?\d*(\.\d+)?$/);

const LinearRegressionUni = ({ messages }) => {
  const [state, setState] = useState({
    data: { status: serviceStatus.OK, error: {}, x: [], y: [] },
    theta: {
      status: serviceStatus.OK,
      error: {},
      value: INITIAL_THETA,
      valid: true
    },
    hypothesis: { status: serviceStatus.OK, error: {}, value: [[]] },
    costSurface: {
      status: serviceStatus.OK,
      error: {},
      value: { J: [[0]], theta0: [[0]], theta1: [[0]] }
    }
  });

  const componentDidMount = async () => {
    setState({
      ...state,
      data: { status: serviceStatus.LOADING, error: {}, x: [], y: [] }
    });

    const response = await getDataByFile('ex1data1.txt', 2);

    if (response instanceof Error) {
      messages.addMessage({
        type: messages.ALERT_TYPES.DANGER,
        content: `ERROR ${response.status}: ${response.message}`
      });

      setState({
        ...state,
        data: { status: serviceStatus.ERROR, error: response, x: [], y: [] }
      });
    } else {
      setState({
        ...state,
        data: {
          status: serviceStatus.OK,
          error: {},
          x: response.x,
          y: response.y
        }
      });
    }
  };

  useEffect(() => {
    componentDidMount();
  }, []); // eslint-disable-line

  const computeHypothesis = async () => {
    setState({
      ...state,
      hypothesis: { status: serviceStatus.LOADING, error: {}, value: [[]] }
    });
    let theta = state.theta.value;
    // parse string to number
    theta = [[+theta[0][0]], [+theta[1][0]]];
    const { x } = state.data;
    const response = await hypothesisService(x, theta);
    if (response instanceof Error) {
      setState({
        ...state,
        hypothesis: {
          status: serviceStatus.ERROR,
          error: response,
          value: 'error'
        }
      });
    } else {
      setState({
        ...state,
        hypothesis: {
          status: serviceStatus.OK,
          error: {},
          value: response
        }
      });
    }
  };

  const computeTheta = async () => {
    setState({
      ...state,
      theta: {
        status: serviceStatus.LOADING,
        error: {},
        value: INITIAL_THETA,
        valid: true
      }
    });
    const { x, y } = state.data;
    const response = await gradientDescentUni(
      x,
      y,
      INITIAL_THETA,
      ALPHA,
      NUMBER_OF_ITERATIONS
    );
    if (response instanceof Error) {
      setState({
        ...state,
        theta: {
          status: serviceStatus.ERROR,
          error: response,
          value: INITIAL_THETA,
          valid: false
        }
      });
    } else {
      setState({
        ...state,
        theta: {
          status: serviceStatus.OK,
          error: {},
          value: [[response[0][0].toFixed(3)], [response[1][0].toFixed(3)]],
          valid: true
        }
      });
    }
  };

  const constFunctionSurface = async () => {
    setState({
      ...state,
      costSurface: {
        status: serviceStatus.LOADING,
        error: {},
        value: { J: [[0]], theta0: [[0]], theta1: [[0]] }
      }
    });
    const { x, y } = state.data;
    const response = await constFunctionSurfaceService(x, y);
    if (response instanceof Error) {
      setState({
        ...state,
        costSurface: {
          status: serviceStatus.ERROR,
          error: response,
          value: { J: [[0]], theta0: [[0]], theta1: [[0]] }
        }
      });
    } else {
      setState({
        ...state,
        costSurface: {
          status: serviceStatus.OK,
          error: {},
          value: response
        }
      });
    }
  };

  const isThetaValid = theta => {
    const theta0 = String(theta[0][0]);
    const theta1 = String(theta[1][0]);

    return (
      theta0.length &&
      theta1.length &&
      regIsDigit.test(theta0) &&
      regIsDigit.test(theta1)
    );
  };

  const onThetaChange = event => {
    const prevTheta = state.theta.value;
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
    setState({
      ...state,
      theta: {
        ...state.theta,
        value: newTheta,
        valid: isThetaValid(newTheta)
      }
    });
  };

  const { data, theta, hypothesis, costSurface } = state;
  const theta0 = theta.value[0][0];
  const theta1 = theta.value[1][0];

  return (
    <div className="container">
      <div className="row">
        <div className="col pb-3">
          <h1>Linear regression with one variable</h1>
          <p>
            <strong>Univariate linear regression</strong>
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
            <MathJax.Node inline>{'(x^{(i)}, y^{(i)}) = i^{th}'}</MathJax.Node>
            <span className="ml-1">training example</span>
          </p>
          <p>
            <MathJax.Node inline>{'x^{(i)} ='}</MathJax.Node>
            <span className="ml-1 mr-1">input (features) of</span>
            <MathJax.Node inline>{'i^{th}'}</MathJax.Node>
            <span className="ml-1">training example</span>
          </p>
          <p>
            <MathJax.Node inline>{'y^{(i)}='}</MathJax.Node>
            <span className="ml-1 mr-1">output variable (target) of</span>
            <MathJax.Node inline>{'i^{th}'}</MathJax.Node>
            <span className="ml-1">training example</span>
          </p>

          <p>
            <span className="mr-3">Hypothesis:</span>
            <MathJax.Node inline>{texHypothesis}</MathJax.Node>
          </p>
          <p>
            <span className="mr-3">Parameters:</span>
            <MathJax.Node inline>{texParameters}</MathJax.Node>
          </p>
          <p>
            <span className="mr-3">Cost Function:</span>
            <MathJax.Node inline>{texCostFunction}</MathJax.Node>
          </p>
          <p>
            <span className="mr-3">Goal:</span>
            <span style={{ position: 'relative', top: '10px' }}>
              <MathJax.Node inline>{texGoal}</MathJax.Node>
            </span>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <DataTable {...data} />
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <p>
            <MathJax.Node inline>{texHypothesis + '='}</MathJax.Node>
            <input
              type="text"
              value={theta0}
              className="ml-1 formula-input"
              size={String(theta0).length || 1}
              onChange={onThetaChange}
              data-theta="zero"
            />
            <span className="m-1">+</span>
            <input
              type="text"
              value={theta1}
              className="formula-input"
              size={String(theta1).length || 1}
              onChange={onThetaChange}
              data-theta="one"
            />
            <MathJax.Node inline>{'x'}</MathJax.Node>
          </p>

          <div>
            <ButtonSubmit
              onClick={computeTheta}
              className="d-inline-block"
              spin={theta.status === serviceStatus.LOADING}
            >
              Compute thetas with Gradient Descent
            </ButtonSubmit>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <DataChart data={data} hypo={hypothesis} />
          <div className="text-center">
            <ButtonSubmit
              onClick={computeHypothesis}
              className="d-inline-block mb-2"
              disabled={!theta.valid}
              spin={hypothesis.status === serviceStatus.LOADING}
            >
              Compute Hypothesis
            </ButtonSubmit>
          </div>
        </div>
      </div>
      <div className="row p-3">
        <div className="col text-center">
          <SurfaceChart data={costSurface.value} />
          <div>
            <ButtonSubmit
              onClick={constFunctionSurface}
              spin={costSurface.status === serviceStatus.LOADING}
            >
              Compute Cost function surface
            </ButtonSubmit>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withMessages(LinearRegressionUni);
