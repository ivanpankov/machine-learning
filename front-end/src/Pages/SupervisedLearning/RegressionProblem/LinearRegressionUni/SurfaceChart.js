import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

const chartLayout = {
  title: 'Cost function J(θ)',
  scene: {
    camera: { 
      eye: { x: -1.4, y: -1.4, z: 0.1 }
    },
    aspectratio: {
      x: 1,
      y: 1,
      z: 1
    },
    xaxis: {
      nticks: 10,
      range: [-10, 10],
      title: 'θ0'
    },
    yaxis: {
      nticks: 10,
      range: [-1, 4],
      title: 'θ1'
    },
    zaxis: {
      nticks: 10,
      range: [-200, 800],
      title: 'J(θ)'
    }
  },
  autosize: false,
  width: 600,
  height: 500,
  margin: {
    l: 65,
    r: 50,
    b: 65,
    t: 90
  }
};

export default class SurfaceChart extends PureComponent {
  render() {
    const data = [
      {
        x: this.props.data.theta0,
        y: this.props.data.theta1,
        z: this.props.data.J,
        type: 'surface',
        contours: {
          z: {
            show: true,
            usecolormap: true,
            highlightcolor: '#42f462',
            project: { z: true },
            width: 1,
            size: 0.5,
          }
        }
      }
    ];
    return <Plot data={data} layout={chartLayout} />;
  }
}
