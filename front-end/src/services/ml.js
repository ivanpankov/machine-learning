import { queryObjToString } from '../lib/utils';
const BASE_URL = '/api';
const ERROR_4xx_CODES = [400, 404];
const DEFAULT_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' };

/**
 * Basic request function used form other services
 *
 * @param {string} url
 * @param {object} query key-value pairs represent query string parameters
 */
export async function request(
  url,
  query = {},
  options = { headers: {}, method: 'GET', data: null }
) {
  const queryString = queryObjToString({ ...query });
  const headers = { ...DEFAULT_HEADERS, ...options.headers };

  const opts = { headers, method: options.method };

  if (options.data) {
    opts.body = JSON.stringify(options.data);
  }

  const response = await fetch(`${url}${queryString}`, opts);

  let responseData = null;

  if (response.ok) {
    // Fetch form Babel and browsers sets ok=true for 4xx errors so we should handle this
    // Status code 4xx should be considered as error even response is 'ok'
    if (!ERROR_4xx_CODES.includes(response.status)) {
      try {
        responseData = await response.json();
      } catch (error) {
        console.log(error); // should be logger
        responseData = new Error('JSON is not valid!');
      }
    } else {
      responseData = new Error(response.statusText);
      responseData.status = response.status;
    }
  } else {
    // node-fetch sets ok=false for 4xx errors
    responseData = new Error(response.statusText);
    responseData.status = response.status;
  }

  return responseData;
}

/**
 * Gets data by passing file path to the server
 * Server parses file in proper JSON format and return in response
 *
 * @param {string} fileUrl path to .csv file
 */
export const getDataByFile = async (filePath, numOfCols) => {
  return request(`${BASE_URL}/file`, { file: filePath, num_of_cols: numOfCols });
};

// data, theta, alpha, maxIters
export const gradientDescentUni = async (
  x,
  y,
  initial_theta,
  alpha,
  num_iters
) => {
  return request('/api/gradient-descent-uni', null, {
    method: 'POST',
    data: {
      x,
      y,
      initial_theta,
      alpha,
      num_iters
    }
  });
};

export const hypothesis = async (x, theta) => {
  return request('/api/hypothesis', null, {
    method: 'POST',
    data: { x, theta }
  });
};

export const constFunctionSurface = async (x, y) => {
  return request('/api/cost-surface', null, {
    method: 'POST',
    data: { x, y }
  });
};