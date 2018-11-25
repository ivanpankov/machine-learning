const _scatterTrace = {
  x: [],
  y: [],
  name: 'Features',
  mode: 'markers',
  marker: { color: 'red' }
};

const _linesTrace = {
  x: [],
  y: [],
  name: 'Hypothesis',
  mode: 'lines',
  marker: { color: 'blue' }
};

export const NULL = [_scatterTrace, _linesTrace];

export function updateScatter(data, { x, y }) {
  let scatter;

  if (!x) {
    scatter = { ..._scatterTrace, y };
  } else if (!y) {
    scatter = { ..._scatterTrace, x };
  } else if (x && y) {
    scatter = { ..._scatterTrace, x, y };
  }

  if (!scatter) return data;
  return [scatter, data[1]];
}

export function updateLines(data, { x, y }) {
  let lines;

  if (!x) {
    lines = { ..._linesTrace, y };
  } else if (!y) {
    lines = { ..._linesTrace, x };
  } else if (x && y) {
    lines = { ..._linesTrace, x, y };
  }

  if (!lines) return data;
  return [data[0], lines];
}
