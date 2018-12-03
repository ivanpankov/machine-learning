export const texHypothesis = 'h_\\theta(x) = \\theta_0 + \\theta_1x';
export const texParameters = '(\\theta_0, \\theta_1)';
export const texCostFunction =
  'J(\\theta_0, \\theta_1) = {1\\over 2m} \\sum_{i=1}^m(h_\\theta(x^{(i)}) - y^{(i)})^2';
export const texGoal =
  '{minimize\\atop ^{\\theta_0, \\theta_1}}  {J(\\theta_0, \\theta_1) \\atop}';

export const chartLayout = {
  width: 400,
  height: 400,
  title: 'Scatter plot of training data',
  xaxis: {
    title: 'Population of City in 10,000s (x)',
    titlefont: {
      size: 13
    }
  },
  yaxis: {
    title: 'Profit in $10,000s (y)',
    titlefont: {
      size: 13
    }
  }
};
