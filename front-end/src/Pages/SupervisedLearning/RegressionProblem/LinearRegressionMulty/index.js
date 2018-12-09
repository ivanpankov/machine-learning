import React, { PureComponent } from 'react';
import serviceStatus from '../../../../services/serviceStatus';
import { getDataByFile, normalizeFeatures } from '../../../../services/ml';
import DataTable from './DataTable';

export default class LinearRegressionMulty extends PureComponent {
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

    console.log(response);
  };

  render() {
    const { data } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>Housing prices in Portland, Oregon.</h3>
            <DataTable {...data} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" onClick={this.normalizeFeatures}>
              Normalize Features
            </button>
          </div>
        </div>
      </div>
    );
  }
}
