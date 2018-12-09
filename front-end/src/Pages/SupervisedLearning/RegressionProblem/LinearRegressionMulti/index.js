import React, { PureComponent } from 'react';
import serviceStatus from '../../../../services/serviceStatus';
import { getDataByFile, normalizeFeatures } from '../../../../services/ml';
import DataTable from './DataTable';
import { withMessages } from '../../../../providers/Messages';
import { texMean, texStandardDeviation } from './constants';
import MathJax from 'react-mathjax';
import ButtonSubmit from '../../../../Components/ButtonSubmit';

class LinearRegressionMulti extends PureComponent {
  state = {
    data: { status: serviceStatus.OK, error: {}, x: [], y: [] },
    dataNorm: { status: serviceStatus.OK, error: {}, x: [], y: [] }
  };

  async componentDidMount() {
    this.setState({
      data: { status: serviceStatus.LOADING, error: {}, x: [], y: [] }
    });

    const response = await getDataByFile('ex1data2.txt', 3);

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

  normalizeFeatures = async () => {
    this.setState({
      dataNorm: { status: serviceStatus.LOADING, error: {}, x: [], y: [] }
    });

    const response = await normalizeFeatures(this.state.data.x);

    if (response instanceof Error) {
      const { messages } = this.props;

      messages.addMessage({
        type: messages.ALERT_TYPES.DANGER,
        content: `ERROR ${response.status}: ${response.message}`
      });

      this.setState({
        dataNorm: { status: serviceStatus.ERROR, error: response, x: [], y: [] }
      });
    } else {
      this.setState({
        dataNorm: {
          status: serviceStatus.OK,
          error: {},
          x: response,
          y: this.state.data.y
        }
      });
    }
  };

  render() {
    const { data, dataNorm } = this.state;

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
              <MathJax.Node formula={'n ='} className="d-inline-block mr-1" />
              <span>number of features</span>
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
              <MathJax.Node
                formula={'x^{(i)}_j ='}
                className="d-inline-block mr-1"
              />
              value of feature{' '}
              <MathJax.Node formula={'j'} className="d-inline-block mr-1" />
              in
              <MathJax.Node
                formula={'i^{th}'}
                className="d-inline-block mr-1 ml-1"
              />
              training example
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4>Housing prices in Portland, Oregon.</h4>
            <DataTable {...data} />
          </div>
        </div>

        <div className="row">
          <div className="col">
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

        {dataNorm.x.length ? (
          <div className="row">
            <div className="col mt-3">
              <h3 className="d-inline">Normalized data</h3>
              <DataTable {...dataNorm} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withMessages(LinearRegressionMulti);
