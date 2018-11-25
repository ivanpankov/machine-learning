/**
 * Empty function
 * Can be used as default property of react components
 */
export const noop = () => {};

/**
 *
 * @param {object} obj object with values that should be converted to query string
 * @return {string} key-value pairs devided by ampersand
 */
export const queryObjToString = (obj = {}) => {
  const keys = Object.keys(obj);

  if (!keys.length) return '';

  return '?' + keys
    .filter(k => obj[k] !== null && typeof obj[k] !== 'undefined')
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join('&');
};
