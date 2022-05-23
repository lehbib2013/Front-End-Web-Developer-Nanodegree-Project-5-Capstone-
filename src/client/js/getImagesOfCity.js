const getImagesInfos = async (city) => {
  const response = await fetch(`/getImagesInfos?city=${city}`);
  try {
    return await response.json();
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

export  { getImagesInfos };
