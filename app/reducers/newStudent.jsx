import axios from 'axios';

const WRITE_STUDENT = 'WRITE_STUDENT';


export function writeStudent(student){
  const action = {type: WRITE_STUDENT, student};
  return action;
}

export function fetchStudent(id){
  return function thunk(dispatch){
    return axios.get(`/api/students/${id}`)
      .then( res => res.data)
      .then( student => {
        const action = writeStudent(student);
        dispatch(action);
      })
  }
}

export default function reducer(state = {name: '', email: '', campusId: 0}, action){
  switch (action.type){
    case WRITE_STUDENT:
      return Object.assign({}, state, action.student);
    default:
      return state;
  }
}
