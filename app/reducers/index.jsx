import { combineReducers } from 'redux';
import students from './students';
import campuses from './campuses';
import error from './error';


const rootReducer = combineReducers({
  students,
  campuses,
  error
});

export default rootReducer;

export * from './campuses';
export * from './students';
export * from './error';

