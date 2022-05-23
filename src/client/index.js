import { getImagesInfos } from './js/getImagesOfCity';
import { getLatLonInfos } from './js/getLatLonData';
import { getWeatherInfos } from './js/getWeatherInfos';
import { deleteTrip } from './js/deleteTrip';
import { createTrip, renderTrip, renderTripsList, renderSegment,validateInputs } from './js/renderHelper';
import { generateTrip, validateTripId, validateSegmentInfos, addSegmentToTrip,deleteTripHandler} from './js/submitHandler';

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

import img from '../client/views/media/logo1.png'

export { getImagesInfos };
export { getLatLonInfos };
export { getWeatherInfos };
export { createTrip, renderTrip, renderTripsList, renderSegment } ;
export { generateTrip, validateTripId, validateSegmentInfos, addSegmentToTrip,validateInputs};
export {deleteTrip, deleteTripHandler} ;


