import axios from 'axios';
import {fetchStudents} from './students';
import {displayError} from './error';

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';


export function getCampuses(campuses){
  const action = {type: GET_CAMPUSES, campuses};
  return action;
}

export function getCampus(campus){
  const action = {type: GET_CAMPUS, campus};
  return action;

}

export function removeCampus(id){
  const action = {type: DELETE_CAMPUS, id};
  return action;
}

export function fetchCampuses(){
  return function thunk(dispatch){
    return axios.get('/api/campuses')
      .then( res => res.data)
      .then( campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      })
      .catch(err => {
        dispatch(displayError(err));
      });
  };
}

export function postCampus(campus, history){
  return function thunk(dispatch){
    return axios.post('/api/campuses', campus)
      .then( res => res.data)
      .then( newCampus => {
        const action = getCampus(newCampus);
        dispatch(action);
        history.push(`/campuses/${newCampus.id}`);
      })
      .catch(err => dispatch(displayError(err)));
  };
}

export function deleteCampus(id, history){
  return function thunk(dispatch){
    return axios.delete(`/api/campuses/${id}`)
      .then( () => {
        history.push('/campuses');
        dispatch(fetchStudents());
        const action = removeCampus(id);
        dispatch(action);
      })
      .catch(err => dispatch(displayError(err)));
  };
}

export default function reducer(state = [], action){
  switch (action.type){
    case GET_CAMPUSES:
      return action.campuses;
    case GET_CAMPUS:
      return [...state, action.campus];
    case DELETE_CAMPUS:
      return state.filter( campus => {
        return campus.id !== action.id;
      });
    default:
      return state;
  }
}
