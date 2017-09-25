const WRITE_CAMPUS = 'WRITE_CAMPUS';


export function writeCampus(campus){
  const action = {type: WRITE_CAMPUS, campus};
  return action;
}


export default function reducer(state = {name: '', image: ''}, action){
  switch (action.type){
    case WRITE_CAMPUS:
      return Object.assign({}, state, action.campus);
    default:
      return state;
  }
}
