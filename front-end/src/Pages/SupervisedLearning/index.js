import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import RegressionProblem from './RegressionProblem';
import ClassificationProblem from './ClassificationProblem';

import './styles.scss';

export default class SupervisedLearning extends PureComponent {
  render() {
    return (
      <>
        <Route path="/supervised/regression" component={RegressionProblem} />
        <Route path="/supervised/classification" component={ClassificationProblem} />
      </>
    );
  }
}
