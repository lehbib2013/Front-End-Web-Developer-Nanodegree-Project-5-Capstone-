require('dotenv').config()
var path = require('path')
const express = require('express')

const app = express()
/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO-Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'))

console.log(__dirname)


// Setup empty JS object to act as endpoint for all routes
let newTrip = {};
let selectedTrip = {};
let arraySavedTrips = [];

const GEO = {
    application_url: process.env.GEO_URL,
    application_key: process.env.GEO_KEY
}
const WEATHERBIT = {
    application_url: process.env.WEATHERBIT_URL,
    application_key:  process.env.WEATHERBIT_KEY
}
const PIXABAY = {
    application_url: process.env.PIXABAY_URL,
    application_key: process.env.PIXABAY_KEY
}
const axios = require('axios');
app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

app.get('/getTrips', async(req,res) => {
      res.send(arraySavedTrips);
})
app.get('/findLatLonInfos',async (req, res) => {
    console.log(`${GEO.application_url}${GEO.application_key}&q=${req.query.city}&limit=1`);
    const response = await axios.get(`${GEO.application_url}${GEO.application_key}&q=${req.query.city}&limit=1`);
    // console.log(req.query.city);
    res.send(response.data);  //contains name lat lon country properties
})

app.get('/getWeatherInfos',async (req, res) => {
   // console.log(`${WEATHERBIT.application_url}${WEATHERBIT.application_key}&lat=${req.query.lat}&lon=${req.query.lon}`);
    const response = await axios.get( 
        `${WEATHERBIT.application_url}${WEATHERBIT.application_key}&lat=${req.query.lat}&lon=${req.query.lon}`
    );
    res.send(response.data);
});

app.get('/getImagesInfos',async (req, res) => {
    const response = await axios.get(
        `${PIXABAY.application_url}${PIXABAY.application_key}&q=${req.query.city}`
    );
    res.send(response.data);
})
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  //  console.log(process.env.GEO_URL);
  //  console.log(`${WEATHERBIT.application_url}${WEATHERBIT.application_key}`);
    console.log('Example app listening on port 8081!');
})
app.get('/deleteTrip',async (req,res) => {
 // find index of 
 console.log("trip");
 console.log(req.query.trip);
 console.log("arraySavedTrips before deleting");
 console.log(arraySavedTrips);
 const deletedItemIndex = arraySavedTrips.findIndex(x=>x.id == req.query.trip);
 arraySavedTrips.splice(deletedItemIndex,1); // first argument is index and second is the number of deleted item
 
 console.log("deletedItemIndex");
 console.log(deletedItemIndex);

 console.log("arraySavedTrips after deleting");
 console.log(arraySavedTrips);
 
 res.send(arraySavedTrips);
})
app.get('/createTrip',async (req,res) => {
    //trip : {]}
      // trip :{id:'4',segmentsTrip:[]}
  //segmentInfos:{city:'',imagePreviewCity:'',iconweather:'',high_temp:'',low_temp:'',description:'description'}
    let lastId;
    if(Object.keys(arraySavedTrips).length ==0) lastId=1;
    else  lastId=arraySavedTrips[arraySavedTrips.length-1].id;
    newTrip = {id:lastId+1,segmentsTrip:[]};
    arraySavedTrips.push(newTrip);
   
    res.send(arraySavedTrips);
   // console.log(arraySavedTrips);
   // let selectedTrip = {};
   // let arraySavedTrips= {};
})
app.post('/addSegmentToTrip',async (req,res)=>{
    // req: {trip_id:1,segmentInfos:{...}}
    // segmentInfos:{city:'',imagePreviewCity:'',iconweather:'',high_temp:'',low_temp:'',description:'description'}
    console.log(req.body);
   // const trip = req.body ;
    var foundIndex = arraySavedTrips.findIndex(x => x.id == req.body.tripId);
    arraySavedTrips[foundIndex].segmentsTrip.push(req.body.segmentInfos);
    console.log("trip");
    console.log(arraySavedTrips[foundIndex]);
    
    res.send({"allItems":arraySavedTrips,"current":arraySavedTrips[foundIndex]});
});
process.on('uncaughtException', function (err) {
    console.log(err);
}); 


