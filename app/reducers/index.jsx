import { combineReducers } from 'redux';
import students from './students';
import campuses from './campuses';
import newStudent from './newStudent';
import newCampus from './newCampus';


const rootReducer = combineReducers({
  students,
  campuses,
  newCampus,
  newStudent
});

export default rootReducer;

export * from './campuses';
export * from './students';
export * from './newCampus';
export * from './newStudent';

