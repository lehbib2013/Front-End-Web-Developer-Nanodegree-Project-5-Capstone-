const createTripBtn = document.getElementById('add-trip-btn');
const feedbackTrip = document.getElementById('feedback-trip');
const listOfTrips = document.getElementById('added-trips');
const listTripsWrapper = document.getElementById('list-trips');
const cityTextValue = document.getElementById('city');
const departureDateValue = document.getElementById('departure');
const createSegmentTrip = document.getElementById('add-segment-btn');
const feedbackSegment = document.getElementById('feedback-segment');

const tripsContainer = document.getElementById('trip-details-item');
const tripContainer = document.getElementById('trip-wrapper');
const checkbtnmenu = document.getElementById('checkbtn');

let infosLatLon = {};
let infosWeather = {};
let infosImages = {};
// attache needed EventListeners to desired buttons



document.addEventListener('DOMContentLoaded',async () => {
  checkbtnmenu.addEventListener('click', async (evt) => {
    
    const checkboxValue = document.getElementById('check').checked;
    console.log("check value is :");
    console.log(checkboxValue);
  });
  await updateListTrip();
  listTripsWrapper.innerHTML = await Client.renderTripsList();
 });

const updateListTrip = async () => {
  let optionsHtml = "<option value='0'>Select Trip</option>";

  const response = localStorage.getItem('arraySavedTrips') ? JSON.parse(localStorage.getItem('arraySavedTrips')) : await fetch('/getTrips');
  try {
 
    const tripsList =  localStorage.getItem('arraySavedTrips') ? JSON.parse(localStorage.getItem('arraySavedTrips')) : await response.json();
    // localStorage.setItem('arraySavedTrips', JSON.stringify(await response));
    console.log("JSON.stringify(response)");
    console.log(JSON.stringify(response));
   // localStorage.removeItem('arraySavedTrips');
   
    localStorage.setItem('arraySavedTrips', JSON.stringify(response ));
   // localStorage.removeItem('arraySavedTrips');
    console.log('tripsList');
    console.log(tripsList);
    if(tripsList.length>0) {
      tripsList.forEach((trip) => {
        optionsHtml += `<option value='${trip.id}'>Trip N° ${trip.id}</option>`;
      });
    }
    
    listOfTrips.innerHTML = optionsHtml;
  } catch (error) {
    console.log('error', error);
  }
};

const deleteTripHandler = async (event) => {
  const { tripId } = event.target.dataset;
  console.log(`/deleteTrip?trip=${tripId}`);
  const deletedTripContainer = document.getElementById(`trip-${tripId}`);

  const arraySavedItems = await Client.deleteTrip(tripId); // deletedTrip(`/deleteTrip?trip=${tripId}`); //fetch(`/deleteTrip?trip=${tripId}`);
  localStorage.setItem('arraySavedTrips', JSON.stringify(arraySavedItems));
  //console.log(response);
  try {
    await updateListTrip();
    deletedTripContainer.remove();//= `<span class='error-msg'>the trip with number ${tripId} and all its segments were successfully deleted</span>`;
  } catch (error) {
    console.log('hjhjh');
    console.log('error', error);
  }
};

const generateTrip = async (event) => {
  event.preventDefault();

  let optionsHtml = "<option value='0'>Select Trip</option>";

  const createdTrips = await Client.createTrip();

  createdTrips.forEach((trip) => {
    optionsHtml += `<option value='${trip.id}'>Trip N° ${trip.id}</option>`;
  });
  console.log(createdTrips[createdTrips.length - 1]);
  console.log(createdTrips.length);
  if (createdTrips.length > 0) {
    feedbackTrip.style.display = 'none';
    feedbackTrip.innerHTML = '';
    listTripsWrapper.insertAdjacentHTML(
      'afterbegin',
      await Client.renderTrip(createdTrips[createdTrips.length - 1]),
    );
  } else {
    feedbackTrip.style.display = 'block'; // `<span class='.error-msg'>The trip can't be added to the system, check if your API endpoints works correctly</span>`;
    feedbackTrip.innerHTML = '<span class=\'.error-msg\'>The trip can\'t be added to the system, check if your API endpoints works correctly</span>';
  }

  console.log(listOfTrips);

  listOfTrips.innerHTML = optionsHtml;
};

const addSegmentToTrip = async (event) => {
  event.preventDefault();
  // get LAT and LON by reading from API
  const city = cityTextValue.value;
  const departure = departureDateValue.value;
  const isValidInputs = await Client.validateInputs({
    city,
    departure,
    selectedTrip: listOfTrips.value,
  });
  console.log('isValidInputs');
  console.log(isValidInputs);
  if (!isValidInputs) {
    feedbackSegment.style.display = 'block';
    feedbackSegment.innerHTML = '<span class=\'.error-msg\'>The segment can\'t be added to the trip, check if you specified the trip</span>';
    return;
  }
  feedbackSegment.style.display = 'none';
  feedbackSegment.innerHTML = '';

  try {
    
    infosLatLon = await Client.getLatLonInfos(city);
    console.log(infosLatLon);
    if (infosLatLon.length === 0) {
      feedbackSegment.textContent('Empty result');
      return;
    }
    console.log('info weather');
    console.log(infosLatLon[0].lat);
    infosWeather = await Client.getWeatherInfos(
      infosLatLon[0].lat,
      infosLatLon[0].lon,
    );
    console.log(infosWeather);
    if (infosWeather.length === 0) {
      feedbackSegment.textContent('Empty result');
      return;
    }
    console.log('infosimage');
    infosImages = await Client.getImagesInfos(city);

    console.log(infosImages);
    //   {city:'',imagePreviewCity:'',iconweather:'',high_temp:'',low_temp:'',description:'description'}
    if (infosImages.length === 0) {
      feedbackSegment.textContent('Empty result');
      return;
    }
    await fetch('/addSegmentToTrip', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tripId: listOfTrips.value,
        segmentInfos: {
          city: infosLatLon[0].name,
          iconweather: infosWeather.data[0].weather.icon,
          high_temp: infosWeather.data[0].high_temp,
          low_temp: infosWeather.data[0].low_temp,
          imagePreviewCity:
            infosImages.hits.length > 0
              ? infosImages.hits[0].previewURL
              : 'NO IMAGE',
          description: infosWeather.data[0].weather.description,
        },
      }),
    }).then(async (tripInfos) => {
      const trip = await tripInfos.json();
      console.log(trip);
      const htm = await Client.renderTrip(trip.current);


      console.log('tripInfos');
      console.log(trip);
      console.log(trip.allItems);
      const currentTripId = document.getElementById(`trip-${trip.current.id}`);
      console.log(`trip-${trip.current.id.id}`);
      console.log(currentTripId);
      localStorage.setItem('arraySavedTrips', JSON.stringify(trip.allItems));
      console.log('await Client.renderTrip(trip)');
      console.log(htm);
      currentTripId.innerHTML = htm;
      
      // on cherche trip-id div to modify innerHTML if exitent or to crete it if not xited
    });
  } catch (error) {
    console.log(error);
  }
};
const validateTripId = () => {};
const validateSegmentInfos = () => {};

export {
  validateTripId,
  validateSegmentInfos,
  addSegmentToTrip,
  generateTrip,
  deleteTripHandler,
};
