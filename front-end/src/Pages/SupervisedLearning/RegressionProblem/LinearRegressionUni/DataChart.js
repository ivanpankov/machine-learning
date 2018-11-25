import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { chartLayout } from './constants';

export default class DataChart extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      x: PropTypes.array,
      y: PropTypes.array
    }),
    hypo: PropTypes.shape({
      value: PropTypes.array
    })
  };

  static defaultProps = {
    data: {
      x: [[]],
      y: [[]]
    },
    hypo: {
      value: [[]]
    }
  };

  render() {
    const { data, hypo } = this.props;
    const x = data.x.map(xi => xi[0]);
    const y = data.y.map(yi => yi[0]);
    const hypothesis = hypo.value.map(h => h[0]);

    const chartData = [
      {
        x,
        y,
        name: 'Features',
        mode: 'markers',
        marker: { color: 'red' }
      },
      {
        x,
        y: hypothesis,
        name: 'Hypothesis',
        mode: 'lines',
        marker: { color: 'blue' }
      }
    ];

    return <Plot data={chartData} layout={chartLayout} />;
  }
}
