export const getHousingPrices = async () => {
  let resData = null;
  const response = await fetch('/api/housing_prices');

  if (response.ok && response.status === 200) {
    resData = await response.json();
  }

  return resData;
};
