const deleteTrip = async (tripId) => {
  const response = await fetch(`/deleteTrip?trip=${tripId}`);
  try {
    return await response.json();
    
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

export  { deleteTrip };
