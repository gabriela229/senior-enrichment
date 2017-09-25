const WRITE_STUDENT = 'WRITE_STUDENT';


export function writeStudent(student){
  const action = {type: WRITE_STUDENT, student};
  return action;
}


export default function reducer(state = {}, action){
  switch (action.type){
    case WRITE_STUDENT:
      return action.student;
    default:
      return state;
  }
}
