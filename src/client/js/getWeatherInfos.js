const getWeatherInfos = async (lat, lon) => {
  console.log(`/getWeatherInfos?lat=${lat}&lon=${lon}`);
  const response = await fetch(`/getWeatherInfos?lat=${lat}&lon=${lon}`);
  try {
    return await response.json();
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

export  { getWeatherInfos };
