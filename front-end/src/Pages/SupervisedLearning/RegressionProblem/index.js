import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import LinearRegressionUni from './LinearRegressionUni';
import LinearRegressionMulti from './LinearRegressionMulti';

export default class RegressionProblem extends PureComponent {
  render() {
    return (
      <>
        <Route
          path="/supervised/regression/linear-uni"
          component={LinearRegressionUni}
        />
        <Route
          path="/supervised/regression/linear-multi"
          component={LinearRegressionMulti}
        />
      </>
    );
  }
}
