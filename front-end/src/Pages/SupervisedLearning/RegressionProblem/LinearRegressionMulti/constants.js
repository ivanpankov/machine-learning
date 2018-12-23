export const texMean =
  '\\bar{x} = {1\\over{m}}\\sum_{i=1}^m x^{(i)} = {{x^{(1)} + x^{(2)} + \\cdots + x^{(m)}} \\over{m}}';
export const texStandardDeviation = '';
export const texHypothesis =
  'h_\\theta(x) = \\theta_0 + \\theta_1x_1 + \\theta_2x_2 + \\cdots + \\theta_nx_n';
export const texHypothesisWithX0 =
  '\\theta_0x_0 + \\theta_1x_1 + \\theta_2x_2 + \\cdots + \\theta_nx_n';
export const texHypothesisVectorized = '\\theta^TX';
export const texMatrixX = `X = \\begin{pmatrix}
    1 & x^{(0)}_1 & x^{(0)}_2 & \\cdots & x^{(0)}_n\\cr
    1 & x^{(1)}_1 & x^{(1)}_2 & \\cdots & x^{(1)}_n\\cr
    1 & x^{(2)}_1 & x^{(2)}_2 & \\cdots & x^{(2)}_n\\cr
    \\vdots & \\vdots & \\vdots &  & \\vdots \\cr
    1 & x^{(m)}_1 & x^{(m)}_2 & \\cdots & x^{(m)}_n\\cr
  \\end{pmatrix}`;
export const texFuncMatrixX = x => {
  const showItems = 4;
  const _x = x.slice(0, showItems).map(row => [1, ...row]);
  if (_x[showItems - 2]) {
    _x[showItems - 2] = _x[showItems - 2].map(() => '\\vdots');
  }
  let result = 'X = \\begin{pmatrix}';
  result += _x.map(row => row.join('&')).join('\\cr');
  result += '\\end{pmatrix}';
  return result;
};

export const thetaVector =
  '\\theta = \\begin{pmatrix} \\theta_0 \\cr \\theta_1 \\cr \\theta_2 \\cr \\vdots \\cr \\theta_n \\end{pmatrix}';
