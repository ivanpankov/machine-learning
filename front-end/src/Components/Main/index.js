import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Supervised from '../../Pages/SupervisedLearning';
import Unsupervised from '../../Pages/UnsupervisedLearning';
import Reinforcement from '../../Pages/ReinforcementLearning';
import Recommender from '../../Pages/RecommenderSystem';
import MathJax from 'react-mathjax2';

export default class Main extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <MathJax.Context
        input="tex"
      >
        <main className={this.props.className}>
          <div className="container">
            <Route path="/supervised" component={Supervised} />
            <Route path="/unsupervised" component={Unsupervised} />
            <Route path="/reinforcement" component={Reinforcement} />
            <Route path="/recommender" component={Recommender} />
          </div>
        </main>
      </MathJax.Context>
    );
  }
}
