import axios from 'axios';
import {displayError} from './error';

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

export function getStudents(students){
  const action = {type: GET_STUDENTS, students};
  return action;
}

export function getStudent(student){
  const action = {type: GET_STUDENT, student};
  return action;
}

export function removeStudent(id){
  const action = {type: DELETE_STUDENT, id};
  return action;
}

export function editStudent(student){
  const action = {type: UPDATE_STUDENT, student};
  return action;
}

export function fetchStudents(){
  return function thunk(dispatch){
    return axios.get('/api/students')
      .then( res => res.data)
      .then( students => {
        const action = getStudents(students);
        dispatch(action);
      })
      .catch(err => dispatch(displayError(err)));
  };
}

export function postStudent(student, history){
  return function thunk(dispatch){
    return axios.post('/api/students', student)
      .then( res => res.data)
      .then( newStudent => {
        const action = getStudent(newStudent);
        dispatch(action);
        history.push(`/students/${newStudent.id}`);
      })
      .catch(err => {
        dispatch(displayError(err));
      });

  };
}

export function updateStudent(student){
  return function thunk(dispatch){
    return axios.put(`/api/students/${student.id}`, student)
      .then( res => res.data)
      .then( updatedStudent => {
        const action = editStudent(updatedStudent);
        dispatch(action);
      })
      .catch(err => dispatch(displayError(err)));
  };
}

export function deleteStudent(id, history){
  return function thunk(dispatch){
    return axios.delete(`/api/students/${id}`)
    .then( () => {
        if (history) {
          history.goBack();
        }
        const action = removeStudent(id);
        dispatch(action);
      });
  };
}

export default function reducer(state = [], action){
  switch (action.type){
    case GET_STUDENTS:
      return action.students;
    case GET_STUDENT:
      return [...state, action.student];
    case DELETE_STUDENT:
      return state.filter( student => {
        return student.id !== action.id;
      });
    case UPDATE_STUDENT:
      return state.map( student => {
        if (student.id === action.student.id){
          return action.student;
        }
        return student;
      });
    default:
      return state;
  }
}
