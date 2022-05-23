const renderTrip = async (trip) => {
    // trip :{id:'4',segmentsTrip:[]}
    //segmentInfos:{city:'',imagePreviewCity:'',iconweather:'',high_temp:'',low_temp:'',description:'description'}
    //
    //
    let htmlTrip = `<button class="delete-btn" data-trip-id="${trip.id}"  onclick="return Client.deleteTripHandler(event)">Delete</button>`;
    let htmlTripContent = ``;
    console.log("trip.segmentsTrip.....");
    console.log(trip.segmentsTrip);
    for (const el of trip.segmentsTrip) {
      const renderres= (await renderSegment(el));
      console.log("el");
      console.log(el);
      console.log(renderres);
      htmlTripContent = htmlTripContent + renderres;
    }
 
    console.log("htmlTrip");
    console.log(htmlTrip);
    console.log("segments");
    console.log(trip.segmentsTrip);
    return `
    <div id='trip-${trip.id}' class="trip-details-item" background="orange">
                      <div  class="trip-wrapper" >
          ${
            trip.segmentsTrip.length > 0
              ? (htmlTrip+htmlTripContent)
              : (htmlTrip+"No segments yet added to this trip")
          }
    </div>
       </div>`;
  };

const renderTripsList = async () => {
  
  const response = await fetch('/getTrips');
 
  let currtrip;
  try {
    let tripsList = localStorage.getItem('arraySavedTrips') ? JSON.parse(localStorage.getItem('arraySavedTrips')):(await response.json().allItems);
    console.log('tripsList');
    console.log(tripsList);
    let triplist=``;
    if (tripsList.length > 0) {
      for(const el of tripsList) {
        currtrip = await renderTrip(el);
        console.log("11111111");
        console.log(currtrip);
      //  trip.segmentsTrip.forEach(async (el)=>{
        triplist+=currtrip;
        }
      }
     console.log("resuuuuult");
    // console.log(listTripsWrapper);
     
     return triplist;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};





const renderSegment = async (segmentInfo) => {
  //event.preventDefault();
  //  segmentInfos:{city:'',imagePreviewCity:'',iconweather:'',high_temp:'',low_temp:'',description:'description'}
  console.log("segm info");
  console.log(segmentInfo);
  return `
    <div id='seg-${segmentInfo.city}' class="segment-wrapper" background-color="yellow" >
                            <div class="segment-header">
                                
                                <h6>${segmentInfo.city}</h6>
                                
                            </div>
                            
                        <div class="segment-body">
                            <div class="weather-start-date">
                                <span>Weather Infos  </span>
                                <ul class="weather-infos">
                                   <li>low temp : ${segmentInfo.low_temp} </li>
                                   <li>high temp :${segmentInfo.high_temp}</li>
                                   <li>${segmentInfo.description}</li>
                                  
                                </ul>
                            </div>
                            <div class="weather-final-date">
                            <img src='${segmentInfo.imagePreviewCity}' />
                        </div>
                        </div>
                    </div> `;
};
const validateInputs = async (infos) => {
  return infos.city && infos.departure && infos.selectedTrip > 0;
};
const createTrip = async () => {
  //event.preventDefault();

  const response = await fetch("/createTrip");
  try {
    const res = (await response.json());
  //  localStorage.setItem('arraySavedTrips', res);
    localStorage.setItem('arraySavedTrips', JSON.stringify(res));
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export {
  createTrip,
  renderTrip,
  renderTripsList,
  renderSegment,
  validateInputs,
};
