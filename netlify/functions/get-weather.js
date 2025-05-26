exports.handler = async (event) => {
  const { city, type } = event.queryStringParameters;

  const apiKey = process.env.API_KEY;

  const baseUrl =
    type === "forecast"
      ? "https://api.shecodes.io/weather/v1/forecast"
      : "https://api.shecodes.io/weather/v1/current";

  const apiUrl = `${baseUrl}?query=${city}&key=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API call failed" }),
    };
  }
};
