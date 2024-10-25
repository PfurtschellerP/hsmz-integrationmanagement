const url =
  'https://api.aviationstack.com/v1/flights?access_key={PASTE_YOUR_API_KEY_HERE}&flight_date=2019-12-11';
const options = {
  method: 'GET',
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}
