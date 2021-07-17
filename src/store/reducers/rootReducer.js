import { combineReducers } from 'redux';

import getData from './getData';
import getDetails from './getDetails';

export default combineReducers({
  getData,
  getDetails,
});
