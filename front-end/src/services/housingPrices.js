export const getHousingPrices = async () => {
  let resData = null;
  const response = await fetch('/api/housing_prices');

  if (response.ok && response.status === 200) {
    resData = await response.json();
  }

  return resData;
};

export const computeCost = async (data, theta) => {
  let resData = null;

  let body = { data, theta };

  body = JSON.stringify(body);

  const response = await fetch('/api/housing_prices/compute_cost', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body
  });

  if (response.ok && response.status === 200) {
    resData = await response.json();
  }

  return resData;
};

export const gradientDescent = async (data, theta, alpha, maxIters) => {
  let resData = null;

  let body = { data, theta, alpha, maxIters };

  body = JSON.stringify(body);

  const response = await fetch('/api/housing_prices/gradient_descent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body
  });

  if (response.ok && response.status === 200) {
    resData = await response.json();
  }

  return resData;
};
