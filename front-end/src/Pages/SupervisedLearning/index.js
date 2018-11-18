import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
// import { getHousingPrices } from '../../services/housingPrices';
// import serviceStatus from '../../services/serviceStatus';
import RegressionProblem from './RegressionProblem';
import ClassificationProblem from './ClassificationProblem';

import './styles.scss';

export default class SupervisedLearning extends PureComponent {
  // state = { housingPrices: { rows: [], status: serviceStatus.OK } };

  // async componentDidMount() {
  //   this.setState({
  //     housingPrices: { rows: [], status: serviceStatus.LOADING }
  //   });

  //   const response = await getHousingPrices();

  //   if (response) {
  //     this.setState({
  //       housingPrices: {
  //         // rows: mapTableData(response),
  //         status: serviceStatus.OK
  //       }
  //     });
  //   } else {
  //     this.setState({
  //       housingPrices: {
  //         rows: [[[<h3>Error loading data!</h3>]]],
  //         status: serviceStatus.ERROR
  //       }
  //     });
  //   }
  // }

  render() {
    return (
      <>
        <Route path="/supervised/regression" component={RegressionProblem} />
        <Route path="/supervised/classification" component={ClassificationProblem} />
      </>
    );
  }
}
