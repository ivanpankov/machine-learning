import React, { PureComponent } from 'react';
import { getHousingPrices } from '../../services/housingPrices';
import serviceStatus from '../../services/serviceStatus';
import Grid from '../../Components/Grid';

import './styles.scss';

const HEADER_NAMES = [
  'training example',
  <span>
    Size in feet
    <sup>2</sup> (x - input)
  </span>,
  <span>Price ($) in 1000's (y - output)</span>
];

const mapTableData = rows => {
  return rows.map((row, i) => [
    <span>
      (x<sup>({i})</sup>, y<sup>({i})</sup>)
    </span>,
    ...row
  ]);
};

export default class SupervisedLearning extends PureComponent {
  state = { housingPrices: { rows: [], status: serviceStatus.OK } };

  async componentDidMount() {
    this.setState({
      housingPrices: { rows: [], status: serviceStatus.LOADING }
    });

    const response = await getHousingPrices();

    if (response) {
      this.setState({
        housingPrices: {
          rows: mapTableData(response),
          status: serviceStatus.OK
        }
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
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Supervised Learning</h1>
          </div>
        </div>
        <div className="row">
          <div className="col" id="housing-prices-table">
            <Grid
              headerNames={HEADER_NAMES}
              rows={rows}
              caption={`Number of training examples (m) = ${rows.length}`}
            />
          </div>
        </div>
      </div>
    );
  }
}
