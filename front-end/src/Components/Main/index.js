import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Supervised from '../../Pages/SupervisedLearning';
import Unsupervised from '../../Pages/UnsupervisedLearning';
import Reinforcement from '../../Pages/ReinforcementLearning';
import Recommender from '../../Pages/RecommenderSystem';
import MathJax from 'react-mathjax2';

export default function Main({ className = '' }) {
  return (
    <MathJax.Context input="tex">
      <main className={className}>
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

Main.propTypes = {
  className: PropTypes.string
};
